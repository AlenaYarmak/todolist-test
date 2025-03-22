import { useState } from 'react';
import TaskItem from './TaskItem';
import FilterBlock from './FilterBlock';
import tasksData from './../data/tasksMockData.json';
import { Task } from '../types/types';

interface TaskListProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    clearCompleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, clearCompleted }) => {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const activeTaskCounter = tasksData.tasks.filter(task => task.status === 'active').length;
    
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return task.status === filter;
    });

    const toggleTaskStatus = (id: string | number) => {
        setTasks(tasks.map(task => 
          task.id === id 
            ? {...task, status: task.status === 'active' ? 'completed' : 'active'} 
            : task
        ));
      };

    return (
        <div className='task-list'>
            {filteredTasks.map((task) => (
                <TaskItem 
                    task={task}
                    key={task.id}
                    onToggle={toggleTaskStatus}
                />
            ))}
            <div className='task-container'>
                <div className='task-counter'>
                    {activeTaskCounter} items left
                </div>
                <FilterBlock filter={filter} setFilter={setFilter}/>
                <div 
                    className='task-clear'
                    onClick={clearCompleted}>
                        Clear Completed
                    </div>
            </div>
        </div>
    )
}

export default TaskList;