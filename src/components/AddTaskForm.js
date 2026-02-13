import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useKanban } from '../hooks/context/KanbanContext';


const AddTaskForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const { addTask, isLoading } = useKanban();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    await addTask(taskTitle);
    setTaskTitle('');
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 hover:border-gray-400"
          data-testid="add-task-button"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Task</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            autoFocus
            disabled={isLoading}
            data-testid="task-title-input"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading || !taskTitle.trim()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg"
              data-testid="submit-task-button"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setTaskTitle('');
              }}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
              data-testid="cancel-task-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;