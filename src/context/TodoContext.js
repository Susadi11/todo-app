import { createContext, useState, useEffect, useContext } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    console.log('Initializing todos state');
    const storedTodos = localStorage.getItem('todos');
    console.log('Stored todos from localStorage:', storedTodos);
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos);
        console.log('Parsed todos:', parsedTodos);
        return parsedTodos;
      } catch (error) {
        console.error('Error parsing stored todos:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    console.log('Todos state changed, current todos:', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Todos saved to localStorage');
  }, [todos]);

  const addTodo = (title, description) => {
    console.log('Adding new todo:', { title, description });
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo];
      console.log('Updated todos after adding:', updatedTodos);
      return updatedTodos;
    });
  };

  const editTodo = (id, updatedTitle, updatedDescription) => {
    console.log('Editing todo:', { id, updatedTitle, updatedDescription });
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, title: updatedTitle, description: updatedDescription }
          : todo
      );
      console.log('Updated todos after editing:', updatedTodos);
      return updatedTodos;
    });
  };

  const deleteTodo = (id) => {
    console.log('Deleting todo with id:', id);
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => todo.id !== id);
      console.log('Updated todos after deleting:', updatedTodos);
      return updatedTodos;
    });
  };

  const toggleCompletion = (id) => {
    console.log('Toggling completion for todo with id:', id);
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      console.log('Updated todos after toggling completion:', updatedTodos);
      return updatedTodos;
    });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, toggleCompletion }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);