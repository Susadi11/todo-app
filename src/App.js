import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

const App = () => {
  return (
    <TodoProvider>
      <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Todo App with Tailwind, Formik & Yup</h1>
        <AddTodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
