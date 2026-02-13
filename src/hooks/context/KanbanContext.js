import { createContext, useContext, useState, useEffect } from 'react';
import { mockApi } from '../../utils/mockApi';

import { toast } from 'sonner';

const KanbanContext = createContext();

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within KanbanProvider');
  }
  return context;
};

const INITIAL_TASKS = [
  { id: '1', title: 'Design landing page mockup', status: 'todo' },
  { id: '2', title: 'Implement drag and drop', status: 'todo' },
  { id: '3', title: 'Set up React Context API', status: 'in-progress' },
  { id: '4', title: 'Add mock authentication', status: 'done' },
];

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   
    const storedTasks = localStorage.getItem('kanban_tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(INITIAL_TASKS);
      localStorage.setItem('kanban_tasks', JSON.stringify(INITIAL_TASKS));
    }
  }, []);

  const saveTasks = (newTasks) => {
    localStorage.setItem('kanban_tasks', JSON.stringify(newTasks));
  };

  const addTask = async (title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      status: 'todo',
    };

    const previousTasks = [...tasks];
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setIsLoading(true);

    try {
      await mockApi.addTask(newTask);
      toast.success('Task added successfully');
    } catch (error) {
     
      setTasks(previousTasks);
      saveTasks(previousTasks);
      toast.error('Failed to add task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const moveTask = async (taskId, newStatus) => {
   
    const previousTasks = [...tasks];
    
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setIsLoading(true);

    try {
      await mockApi.moveTask(taskId, newStatus);
      toast.success('Task moved successfully');
    } catch (error) {
      setTasks(previousTasks);
      saveTasks(previousTasks);
      toast.error('Failed to move task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    
    const previousTasks = [...tasks];

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setIsLoading(true);

    try {
      await mockApi.deleteTask(taskId);
      toast.success('Task deleted successfully');
    } catch (error) {
      setTasks(previousTasks);
      saveTasks(previousTasks);
      toast.error('Failed to delete task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <KanbanContext.Provider
      value={{
        tasks,
        isLoading,
        addTask,
        moveTask,
        deleteTask,
        getTasksByStatus,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};