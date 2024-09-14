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
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Todo List</h2>
      <ul className="space-y-4">
        {todos.map(todo => (
          <li key={todo.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className={`text-xl font-semibold text-gray-900`}>
                  {todo.title}
                </h3>
                <p className="text-gray-600">{todo.description}</p>
                <span
                  className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                    todo.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {todo.completed ? 'Completed' : 'Incomplete'}
                </span>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  color="primary"
                />
                <button
                  onClick={() => handleEditClick(todo.id)}
                  className="ml-4 rounded-full bg-gray-300 px-4 py-1 hover:bg-gray-400 text-sm font-semibold text-gray-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-4 rounded-full bg-red-500 px-4 py-1 hover:bg-red-600 text-sm font-semibold text-white"
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
