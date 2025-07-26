import Navbar from '../components/Navbar';
import TimesheetTable from '../components/TimesheetTable';
import Footer from '../components/Footer';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <TimesheetTable />
      </main>
    </div>
  );
}
