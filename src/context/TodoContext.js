import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

// Create a TodoContext for managing todos
const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [todos, setTodos] = useState([]); 

  // Load todos from localStorage based on the logged-in user
  useEffect(() => {
    if (user) {
      const storedTodos = localStorage.getItem(`todos_${user.uid}`);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      } else {
        setTodos([]); 
      }
    } else {
      setTodos([]); 
    }
  }, [user]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos_${user.uid}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  // Add a new todo item
  const addTodo = (title, description) => {
    if (!user) return; 
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      userId: user.uid, 
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  // Edit an existing todo item
  const editTodo = (id, updatedTitle, updatedDescription) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, title: updatedTitle, description: updatedDescription } : todo
      )
    );
  };

  // Delete a todo item
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // Toggle the completion status of a todo item
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
