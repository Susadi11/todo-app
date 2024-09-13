import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';
import { Switch } from '@mui/material'; // Use MUI's Switch component

const TodoList = () => {
  const { todos, deleteTodo, toggleCompletion } = useTodos();
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleToggle = (id) => {
    toggleCompletion(id);
  };

  return (
    <div className="w-full max-w-md mt-8 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul className="space-y-4">
        {todos.map(todo => (
          <li key={todo.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-xl font-semibold ${todo.completed ? 'line-through' : ''}`}>
                  {todo.title}
                </h3>
                <p className="text-gray-600">{todo.description}</p>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  color="primary"
                />
                <button
                  onClick={() => handleEditClick(todo.id)}
                  className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
