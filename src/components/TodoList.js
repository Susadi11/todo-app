import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#34C759' : '#34C759',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E5E5EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

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
            <h2 className="text-2xl font-bold mb-4 text-gray-900">To-Do List</h2>
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
                               
                                <IOSSwitch
                                    checked={todo.completed}
                                    onChange={() => handleToggle(todo.id)}
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