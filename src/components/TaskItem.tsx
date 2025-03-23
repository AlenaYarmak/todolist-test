import Checkbox from './Checkbox';
import { Task } from '../types/types';
import RemoveButton from './RemoveButton';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string | number) => void;
    onRemove: (id: string | number) => void;
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent, task: Task) => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDragLeave?: (e: React.DragEvent) => void;
    onDrop?: (e: React.DragEvent, task: Task) => void;
    onDragEnd?: (e: React.DragEvent) => void;
    isDragging?: boolean;
    isDragOver?: boolean;
}

const TaskItem: React.FC<TaskItemProps> =({
    task, 
    onToggle, 
    onRemove, 
    draggable = true,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    isDragging,
    isDragOver
 }) => {
    const isCompleted = task.status === 'completed';

    const handleDragStart = (e: React.DragEvent) => {
        if (onDragStart) onDragStart(e, task);
    };

    return (
        <div   
            className='task-list__item'
            draggable={draggable}
            onDragStart={handleDragStart}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop && onDrop(e, task)}
            onDragEnd={onDragEnd}>
            <Checkbox
                checked={isCompleted}
                onClick={() => onToggle(task.id)} />
            <div className={`task-list__item__description ${isCompleted ? 'text--completed' : ''}`}>
                {task.description}
            </div>
            <RemoveButton onClick={() => onRemove(task.id)}/>
        </div>
    )
}

export default TaskItem;