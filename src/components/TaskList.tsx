import { useState } from 'react';
import TaskItem from './TaskItem';
import FilterBlock from './FilterBlock';
import { Task } from '../types/types';

interface TaskListProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    clearCompleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, clearCompleted }) => {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [draggedTaskId, setDraggedTaskId] = useState<string | number | null>(null);
    const [dragOverTaskId, setDragOverTaskId] = useState<string | number | null>(null);
    
    const activeTaskCounter = tasks.filter(task => task.status === 'active').length;
    
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

    const removeTask = (id: string | number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleDragStart = (e: React.DragEvent, task: Task) => {
        setDraggedTaskId(task.id);

        e.dataTransfer.setData('text/plain', task.id.toString());
    };

    /* dnd */
    const handleDragEnd = (e: React.DragEvent) => {
        if (e.target instanceof HTMLElement) {
            e.target.classList.remove('dragging');
        }
        /* setDraggedTaskId(null);
        setDragOverTaskId(null); */
    };

    const handleDragOver = (e: React.DragEvent, task: Task) => {
        /* allow browser to drop task */
        e.preventDefault();
        /* dont update state if dragged and dropped is the same task */
        if (task.id === draggedTaskId) return;
        
        setDragOverTaskId(task.id);
    };

    const handleDragLeave = () => {
        setDragOverTaskId(null);
    };

    const handleDrop = (e: React.DragEvent, targetTask: Task) => {
        e.preventDefault();
        setDragOverTaskId(null);
        
        const draggedId = draggedTaskId;
        /* prevent trying to drop an item onto itself */
        if (!draggedId || draggedId === targetTask.id) return;

        const tasksCopy = [...tasks];
        
        /* here define dragged and target id */
        const draggedIndex = tasksCopy.findIndex(task => task.id === draggedId);
        const targetIndex = tasksCopy.findIndex(task => task.id === targetTask.id);
        
        if (draggedIndex === -1 || targetIndex === -1) return;
        
        /* remove and insert in new place */
        const [removed] = tasksCopy.splice(draggedIndex, 1);
        tasksCopy.splice(targetIndex, 0, removed);
        
        /* new order of tasks */
        setTasks(tasksCopy);
    };

    return (
        <div className='task-list'>
            {filteredTasks.map((task) => (
                <TaskItem 
                    task={task}
                    key={task.id}
                    onToggle={toggleTaskStatus}
                    onRemove={removeTask}
                    draggable={true}
                    onDragStart={handleDragStart}
                    onDragOver={(e) => handleDragOver(e, task)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, task)}
                    onDragEnd={handleDragEnd}
                    isDragging={task.id === draggedTaskId}
                    isDragOver={task.id === dragOverTaskId}
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
    );
};

export default TaskList;