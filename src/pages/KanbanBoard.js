import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { useAuth } from '../hooks/context/AuthContext';
import { useKanban } from '../hooks/context/KanbanContext';
import Column from '../components/Column';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';
import { LogOut, User } from 'lucide-react';


const KanbanBoard = () => {
  const { user, logout } = useAuth();
  const { getTasksByStatus, moveTask, tasks } = useKanban();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
    { id: 'done', title: 'Done', status: 'done' },
  ];

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const taskId = active.id;
    const overId = over.id;

    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      setActiveId(null);
      return;
    }

    let newStatus = task.status;
 
    if (['todo', 'in-progress', 'done'].includes(overId)) {
      newStatus = overId;
    } else {
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (newStatus !== task.status) {
      moveTask(taskId, newStatus);
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeTask = tasks.find((task) => task.id === activeId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="board-title">Kanban Board</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your tasks efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="font-medium" data-testid="user-name">{user?.username}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
                data-testid="logout-button"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AddTaskForm />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="kanban-columns">
            {columns.map((column) => {
              const columnTasks = getTasksByStatus(column.status);
              return (
                <Column
                  key={column.id}
                  title={column.title}
                  status={column.status}
                  tasks={columnTasks}
                  count={columnTasks.length}
                />
              );
            })}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="rotate-3 scale-105">
                <TaskCard task={activeTask} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;