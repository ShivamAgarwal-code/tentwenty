'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import AddEntryModal from './AddEntryModal';

interface Task {
  id: number;
  project: string;
  hours: number;
  category?: string;
}

interface WeekData {
  startDate: string;
  endDate: string;
  tasks: Record<string, Task[]>;
}

export default function TimesheetList({ week }: { week: string }) {
  const [weekData, setWeekData] = useState<WeekData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch data for the selected week
  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`/api/timesheets/${week}`)
      .then((res) => {
        if (!res.ok) throw new Error('Timesheet not found');
        return res.json();
      })
      .then((data) => setWeekData(data))
      .catch((err) => {
        console.error('Failed to fetch timesheet data:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [week]);

  // Add new task entry
  const handleAddEntry = (entry: { project: string; hours: number }) => {
    setWeekData((prev) => {
      if (!prev) return prev;

      const updatedTasks = {
        ...prev.tasks,
        [selectedDate]: [
          ...(prev.tasks[selectedDate] || []),
          {
            id: Date.now(),
            project: entry.project,
            hours: entry.hours,
          },
        ],
      };

      return { ...prev, tasks: updatedTasks };
    });
  };

  // Delete task entry
  const handleDeleteTask = (dateKey: string, taskId: number) => {
    setWeekData((prev) => {
      if (!prev) return prev;

      const updatedTasks = {
        ...prev.tasks,
        [dateKey]: prev.tasks[dateKey].filter(task => task.id !== taskId),
      };

      return { ...prev, tasks: updatedTasks };
    });
  };

  // ⏳ Show loading spinner
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="text-center py-10 text-gray-500">
            Loading timesheet...
          </div>
        </div>
      </div>
    );
  }

  // ❌ Show error if fetch failed
  if (error || !weekData || !weekData.tasks) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="text-center py-10 text-red-500">
            Failed to load timesheet or data not available.
          </div>
        </div>
      </div>
    );
  }

  // ✅ Calculate total hours
  const totalHours = Object.values(weekData.tasks)
    .flat()
    .reduce((sum, task) => sum + task.hours, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-left items-center">
            <div>
              <h2 className="text-xl font-semibold text-black">This week's timesheet</h2>
              <span className="text-sm text-gray-500">21-26 January, 2024</span>
            </div>
            <span className="text-sm text-gray-600 ml-130">{totalHours}/40 hrs</span>
          </div>

          {/* Progress Bar - moved to right */}
          <div className="flex justify-end">
            <div className="w-48 relative">
              <div className="text-xs text-gray-600 text-right mb-1">100%</div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totalHours / 40) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Daily Tasks */}
          <div className="space-y-6">
            {Object.entries(weekData.tasks).map(([date, tasks]) => (
              <div key={date}>
                <h4 className="font-medium text-gray-700 mb-3 text-sm">{date}</h4>
                <div className="space-y-2">
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onDelete={() => handleDeleteTask(date, task.id)}
                      />
                    ))
                  ) : null}
                  
                  {/* Add new task button */}
                  <button
                    className="w-full p-3 border-2 cursor-pointer border-dashed border-blue-200 rounded-lg text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm"
                    onClick={() => {
                      setSelectedDate(date);
                      setShowModal(true);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add new task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <AddEntryModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddEntry}
          />
        )}
      </div>
      
      {/* Footer */}
       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
        <p className="text-xs text-gray-500">© 2024 Tentwenty. All rights reserved.</p>
      </div>
    </div>
  );
}