import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import EditTodoPage from './pages/EditTodoPage';

const App = () => {
  return (
    <TodoProvider>
      <Router>
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<><AddTodoForm /><TodoList /></>} />
            <Route path="/edit/:id" element={<EditTodoPage />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
};

export default App;
