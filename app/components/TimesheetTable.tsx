'use client';

import { useEffect, useState } from 'react';

interface TimesheetEntry {
  week: number;
  date: string;
  status: 'COMPLETED' | 'INCOMPLETE' | 'MISSING';
  action: 'View' | 'Update' | 'Create';
}

// Utility for status colors - matching Figma design
const getStatusColor = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-700 font-medium';
    case 'INCOMPLETE':
      return 'bg-orange-100 text-orange-700 font-medium';
    case 'MISSING':
      return 'bg-red-100 text-red-600 font-medium';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function TimesheetTable() {
  const [data, setData] = useState<TimesheetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/timesheets')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-black">Your Timesheets</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Week #
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">
                    Loading timesheets...
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-red-500">
                    Failed to load timesheets.
                  </td>
                </tr>
              )}

              {!loading && !error && data.map((entry) => (
                <tr key={entry.week} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-black bg-gray-50">{entry.week}</td>
                  <td className="py-4 px-6 text-sm text-black">{entry.date}</td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wide ${getStatusColor(entry.status)}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href={`/timesheet/${entry.week}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
                    >
                      {entry.action}
                    </a>
                  </td>
                </tr>
              ))}

              {!loading && !error && data.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">
                    No timesheet entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">© 2024 Tentwenty. All rights reserved.</p>
      </div>
    </div>
  );
}