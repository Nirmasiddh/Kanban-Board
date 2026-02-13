import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { useKanban } from '../hooks/context/KanbanContext';


const TaskCard = ({ task }) => {
  const { deleteTask } = useKanban();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md mb-3 group"
      data-testid={`task-card-${task.id}`}
    >
      <div className="flex items-start gap-3">
        <button
          className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 flex-shrink-0"
          {...attributes}
          {...listeners}
          data-testid={`drag-handle-${task.id}`}
        >
          <GripVertical className="w-5 h-5" />
        </button>
        
        <p className="flex-1 text-gray-800 text-sm leading-relaxed">
          {task.title}
        </p>
        
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 flex-shrink-0 p-1"
          data-testid={`delete-button-${task.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;