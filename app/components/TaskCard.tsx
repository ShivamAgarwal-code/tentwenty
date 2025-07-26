import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Task {
  project: string;
  hours: number;
  category?: string;
}

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  // Get category color based on project type
  const getCategoryColor = (project: string) => {
    if (project.toLowerCase().includes('development')) {
      return 'bg-blue-100 text-blue-700 border-blue-200';
    }
    if (project.toLowerCase().includes('design')) {
      return 'bg-purple-100 text-purple-700 border-purple-200';
    }
    if (project.toLowerCase().includes('meeting')) {
      return 'bg-green-100 text-green-700 border-green-200';
    }
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const handleEdit = () => {
    // Handle edit functionality here
    setShowMenu(false);
    console.log('Edit task:', task);
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete();
  };

  return (
    <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <span className="text-sm font-medium text-gray-900">{task.project}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{task.hours} hrs</span>
        <span className="text-xs px-2 py-1 rounded border font-medium bg-blue-100 text-blue-700 border-blue-200">
          Project Hours
        </span>

        {/* Three dots menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-200 cursor-pointer rounded transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>

          {showMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />

              {/* Menu */}
              <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                <button
                  onClick={handleEdit}
                  className="w-full px-3 py-2 text-left cursor-pointer text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-3 py-2 text-left cursor-pointer text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}