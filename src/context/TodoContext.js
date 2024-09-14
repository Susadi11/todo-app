import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { user } = useAuth(); // Get the current authenticated user
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage based on the logged-in user
  useEffect(() => {
    if (user) {
      const storedTodos = localStorage.getItem(`todos_${user.id}`);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }
  }, [user]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (user && todos.length) {
      localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  const addTodo = (title, description) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      userId: user.id, // Associate todo with the logged-in user
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
