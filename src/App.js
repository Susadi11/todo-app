import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import TodoPage from './pages/TodoPage';
import EditTodoPage from './pages/EditTodoPage';

const App = () => {
  return (
    <TodoProvider>
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/edit/:id" element={<EditTodoPage />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
};

export default App;
