import Checkbox from './Checkbox';
import { Task } from '../types/types';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string | number) => void;
}

const TaskItem: React.FC<TaskItemProps> =({ task, onToggle }) => {
    const isCompleted = task.status === 'completed';
    return (
        <div className='task-list__item'>
            <Checkbox
                checked={isCompleted}
                onClick={() => onToggle(task.id)} />
            <div className='task-list__item__description'>
                {task.description}
            </div>
        </div>
    )
}

export default TaskItem;