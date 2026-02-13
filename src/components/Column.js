import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const Column = ({ title, status, tasks, count }) => {
  const { setNodeRef } = useDroppable({ id: status });

  const getColumnColor = () => {
    switch (status) {
      case 'todo':
        return 'bg-gray-50 border-gray-200';
      case 'in-progress':
        return 'bg-blue-50 border-blue-200';
      case 'done':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getHeaderColor = () => {
    switch (status) {
      case 'todo':
        return 'text-gray-700';
      case 'in-progress':
        return 'text-blue-700';
      case 'done':
        return 'text-green-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div 
      className={`rounded-xl border-2 ${getColumnColor()} p-4 flex flex-col h-full`}
      data-testid={`column-${status}`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-semibold ${getHeaderColor()}`}>
            {title}
          </h2>
          <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${getHeaderColor()} bg-white`}>
            {count}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto min-h-[200px]"
      >
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
