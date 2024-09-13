import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';
import EditTodoForm from '../components/EditTodoForm';

const EditTodoPage = () => {
  const { id } = useParams();
  const { todos, editTodo } = useTodos();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundTodo = todos.find(todo => todo.id === parseInt(id));
    if (foundTodo) {
      setTodo(foundTodo);
    } else {
      // Redirect to the todo list page if the todo is not found
      navigate('/');
    }
  }, [id, todos, navigate]);

  const handleClose = () => {
    navigate('/');
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
      <EditTodoForm todo={todo} onClose={handleClose} />
    </div>
  );
};

export default EditTodoPage;
