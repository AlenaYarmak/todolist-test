import { useState } from 'react';
import Header from './components/Header';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { Task } from './types/types';
import tasksData from './data/tasksMockData.json';
import './styles/main.scss';

function App() {
  const [tasks, setTasks] = useState<Task[]>(
    tasksData.tasks.map(task => ({
      ...task,
      status: task.status as 'active' | 'completed',
    }))
  );

  const addNewTask = (description: string) => {
    /* prevent to add empty task */
    if (description.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now(),
      description: description,
      status: 'active'
    };
    
    setTasks([...tasks, newTask]);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => task.status !== 'completed'));
  };
  return (
    <div className='wrapper'>
      <div className='container'>
        <Header />
        <AddTask onAddTask={addNewTask}/>
        <TaskList tasks={tasks} setTasks={setTasks} clearCompleted={clearCompleted}/>
      </div>
    </div>
  )
}

export default App;
