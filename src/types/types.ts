export interface Task {
    id: string | number;
    description: string;
    status: 'active' | 'completed';
}