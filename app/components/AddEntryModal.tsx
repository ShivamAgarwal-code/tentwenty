'use client';

import { useState } from 'react';
import { X, ChevronDown, Minus, Plus, Info } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSubmit: (entry: any) => void;
}

export default function AddEntryModal({ onClose, onSubmit }: Props) {
  const [project, setProject] = useState('');
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');
  const [hours, setHours] = useState(1);

  const handleSubmit = () => {
    if (!project || !type || !desc || !hours) return;
    onSubmit({ project, type, desc, hours });
    onClose();
  };

  const incrementHours = () => {
    if (hours < 12) setHours(hours + 1);
  };

  const decrementHours = () => {
    if (hours > 1) setHours(hours - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-black">Add New Entry</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 cursor-pointer rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Select Project */}
          <div>
            <label className="flex items-center text-sm font-medium mb-2 text-gray-700">
              Select Project <span className="text-red-500">*</span>
              <button className="ml-1 w-4 h-4 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <Info className="w-2.5 h-2.5 text-gray-600" />
              </button>
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              >
                <option value="">Project Name</option>
                <option value="Homepage Development">Homepage Development</option>
                <option value="Dashboard Design">Dashboard Design</option>
                <option value="API Integration">API Integration</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Type of Work */}
          <div>
            <label className="flex items-center text-sm font-medium mb-2 text-gray-700">
              Type of Work <span className="text-red-500">*</span>
              <button className="ml-1 w-4 h-4 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <Info className="w-2.5 h-2.5 text-gray-600" />
              </button>
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Bug fixes</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Testing">Testing</option>
                <option value="Meeting">Meeting</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Task description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write task here..."
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className='text-black'>A note for extra info</div>
          </div>

          {/* Hours */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Hours <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={decrementHours}
                disabled={hours <= 1}
                className="w-8 h-8 rounded-full border cursor-pointer border-gray-800 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">
                {hours}
              </span>
              <button
                type="button"
                onClick={incrementHours}
                disabled={hours >= 12}
                className="w-8 h-8 rounded-full border cursor-pointer border-gray-800 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!project || !type || !desc || !hours}
            className="px-6 py-2 rounded-lg bg-blue-600 cursor-pointer text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add entry
          </button>
        </div>
      </div>
    </div>
  );
}