import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';

const TodoList = () => {
  const { todos, deleteTodo, toggleCompletion } = useTodos();
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="w-full max-w-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul className="space-y-4">
        {todos.map(todo => (
          <li key={todo.id} className="bg-white p-4 rounded-lg shadow-md">
            <div>
              <h3 className={`text-xl font-semibold ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </h3>
              <p className="text-gray-600">{todo.description}</p>
              <div className="mt-4">
                <button
                  onClick={() => toggleCompletion(todo.id)}
                  className={`mr-4 p-2 rounded ${todo.completed ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                >
                  {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => handleEditClick(todo.id)}
                  className="mr-4 p-2 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 bg-red-500 text-white rounded"
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
