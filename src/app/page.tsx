"use client";
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
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const currentTask = updatedTasks[index];

      // Toggle the completion status
      updatedTasks[index] = currentTask.includes('✅') ? currentTask.replace('✅ ', '') : `✅ ${currentTask}`;

      return updatedTasks;
    });
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <main>
      <div className='container'>
        <div className='todo-app'>
          <h1 className='text-xl font-bold'>To-Do List</h1>
          <div className="row">
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
              <li key={index} onClick={() => handleTaskClick(index)} className={task.includes('✅') ? 'checked' : ''}>
                {task}
              </li>
            ))}
          </ul>
          <div>
            <button className="clear-all" onClick={handleClearAll}>
              Clear All
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
   

        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          cursor: pointer;
        }

     

        .clear-all {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px;
          margin-top: 4px;
          cursor: pointer;
          border-radius: 5px;
        }
      `}</style>
    </main>
  );
}
