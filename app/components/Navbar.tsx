import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-black">ticktock</div>
        <div className="text-sm font-medium text-gray-600">Timesheets</div>
      </div>
      <div className="text-sm text-gray-800 flex items-center gap-1">
        John Doe 
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </nav>
  );
}