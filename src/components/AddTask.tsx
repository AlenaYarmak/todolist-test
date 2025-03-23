import { useState, useRef } from 'react';

interface AddTaskProps {
    onAddTask: (description: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [newTaskName, setNewTaskName] = useState('');

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          onAddTask(newTaskName);
          setNewTaskName('');
        }
    };
    return (
        <div  
            className='task-add'
            onClick={() => inputRef.current?.focus()}>
            <div className='checkbox'></div>
            <input
                ref={inputRef}
                className='task-add__input' 
                type='text'
                placeholder='Create a new todo...'
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyPress={handleKeyPress}/>
        </div>
    )
}

export default AddTask;