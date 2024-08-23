import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
    };

    const createTask = async (title, taskDesc) => {
        const response = await axios.post('http://localhost:3000/tasks', {
            title,
            taskDesc,
        });
        setTasks([...tasks, response.data]);
    };

    const updateTask = async (id, updatedTitle, updatedTaskDesc) => {
        const response = await axios.put(`http://localhost:3000/tasks/${id}`, {
            title: updatedTitle,
            taskDesc: updatedTaskDesc,
        });
        setTasks(
            tasks.map((task) =>
                task.id === id ? response.data : task
            )
        );
    };

    
    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
