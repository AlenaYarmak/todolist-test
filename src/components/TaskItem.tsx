import Checkbox from './Checkbox';
import { Task } from '../types/types';
import RemoveButton from './RemoveButton';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string | number) => void;
    onRemove: (id: string | number) => void;
}

const TaskItem: React.FC<TaskItemProps> =({ task, onToggle, onRemove }) => {
    const isCompleted = task.status === 'completed';
    return (
        <div className='task-list__item'>
            <Checkbox
                checked={isCompleted}
                onClick={() => onToggle(task.id)} />
            <div className='task-list__item__description'>
                {task.description}
            </div>
            <RemoveButton onClick={() => onRemove(task.id)}/>
        </div>
    )
}

export default TaskItem;