import React from 'react';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import LogoutButton from '../components/LogoutButton';

const TodoPage = () => {
  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Todo Page</h1>
      <LogoutButton />
      <AddTodoForm />
      <TodoList />
    </div>
  );
};

export default TodoPage;
