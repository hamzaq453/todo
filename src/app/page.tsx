"use client" 
import React, { useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  // Load tasks from Local Storage on component mount
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      console.log('Stored Tasks:', storedTasks);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error parsing tasks from Local Storage:', error);
    }
  }, []);

  // Save tasks to Local Storage whenever tasks change
  useEffect(() => {
    console.log('Tasks:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addTask = () => {
    if (inputValue === '') {
      alert("You must write something");
    } else {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const handleTaskClick = (index: number) => {
    const updatedTasks = [...tasks];
    const currentTask = updatedTasks[index];

    if (currentTask.includes('✅')) {
      updatedTasks[index] = currentTask.replace('✅ ', '');
    } else {
      updatedTasks[index] = `✅ ${currentTask}`;
    }

    setTasks(updatedTasks);
  };

  const handleTaskRemoveClick = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <main>
      <div className='container '>
        <div className='todo-app'>
          <h1 className='text-xl font-bold'>To-Do List</h1>
          <div className="row ">
            <input
              type="text"
              id='input-box'
              placeholder='Add text'
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul id='list-container'>
            {tasks.map((task, index) => (
              <li
                key={index}
                onClick={() => handleTaskClick(index)}
                className={task.includes('✅') ? 'checked' : ''}
              >
                {task}
                <span
                  className="remove-task"
                  onClick={() => handleTaskRemoveClick(index)}
                >
                  Remove
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
