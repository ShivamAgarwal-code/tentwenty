'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import TimesheetList from '@/app/components/TimesheetList';

export default function TimesheetWeekPage() {
  const params = useParams();
  const week = params.week?.toString() || '1'; // default to week 1 if missing

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <TimesheetList week={week} />
      </main>
    </div>
  );
}
