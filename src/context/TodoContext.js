import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { user } = useAuth(); // Get the current authenticated user
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage based on the logged-in user
  useEffect(() => {
    if (user) {
      const storedTodos = localStorage.getItem(`todos_${user.uid}`);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      } else {
        setTodos([]); // Ensure todos is an empty array if no data
      }
    } else {
      setTodos([]); // Clear todos if no user is logged in
    }
  }, [user]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos_${user.uid}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  const addTodo = (title, description) => {
    if (!user) return; // Make sure user exists
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      userId: user.uid, // Associate todo with the logged-in user
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const editTodo = (id, updatedTitle, updatedDescription) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, title: updatedTitle, description: updatedDescription } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, toggleCompletion }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);