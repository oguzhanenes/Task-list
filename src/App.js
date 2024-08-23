import axios from 'axios';
import './App.css';
import React, { useContext } from 'react';
import TaskCreate from './components/TaskCreate';
import TaskShow from './components/TaskShow';
import { TaskProvider, TaskContext } from './TaskContext';

function App() {
  const { tasks, createTask, updateTask, deleteTask } = useContext(TaskContext);

  return (
    <TaskProvider>
      <div className="App">
        <TaskCreate onCreate={createTask} />
        <div className="task-list">
          {tasks.map((task) => (
            <TaskShow
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
