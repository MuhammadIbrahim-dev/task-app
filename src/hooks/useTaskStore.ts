
import { useState, useEffect } from 'react';
import { Task } from '@/types/task';

const STORAGE_KEY = 'taskManager_tasks';

// Mock data for demonstration
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design Mobile App Interface',
    description: 'Create wireframes and mockups for the new mobile application interface with focus on user experience.',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sarah Chen',
    dueDate: '2025-06-25T00:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2025-06-18T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Implement Real-time Notifications',
    description: 'Set up push notification system for task updates and collaboration features.',
    status: 'pending',
    priority: 'medium',
    assignee: 'Mike Johnson',
    dueDate: '2025-06-30T00:00:00.000Z',
    createdAt: '2025-06-16T00:00:00.000Z',
    updatedAt: '2025-06-16T00:00:00.000Z'
  },
  {
    id: '3',
    title: 'Write API Documentation',
    description: 'Complete comprehensive API documentation for the task management endpoints.',
    status: 'completed',
    priority: 'medium',
    assignee: 'Alex Rodriguez',
    dueDate: '2025-06-20T00:00:00.000Z',
    createdAt: '2025-06-10T00:00:00.000Z',
    updatedAt: '2025-06-19T00:00:00.000Z'
  },
  {
    id: '4',
    title: 'Set up CI/CD Pipeline',
    description: 'Configure automated testing and deployment pipeline for the application.',
    status: 'in-progress',
    priority: 'high',
    assignee: 'David Kim',
    dueDate: '2025-06-28T00:00:00.000Z',
    createdAt: '2025-06-14T00:00:00.000Z',
    updatedAt: '2025-06-17T00:00:00.000Z'
  },
  {
    id: '5',
    title: 'User Testing Session',
    description: 'Conduct user testing sessions to gather feedback on the new features.',
    status: 'pending',
    priority: 'low',
    assignee: 'Emma Wilson',
    dueDate: '2025-07-05T00:00:00.000Z',
    createdAt: '2025-06-18T00:00:00.000Z',
    updatedAt: '2025-06-18T00:00:00.000Z'
  }
];

export const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // Use initial mock data
        setTasks(initialTasks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      setTasks(initialTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);
    console.log('Task added:', newTask);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
    console.log('Task updated:', id, updates);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    console.log('Task deleted:', id);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask
  };
};
