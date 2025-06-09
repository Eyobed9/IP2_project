import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Appointment {
  id: number;
  patient_name: string;
  doctor_name: string;
  date: string;
  status: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual backend endpoints
        const usersRes = await axios.get(
          "http://localhost:8080/ip2_project/aastu_clinic/backend/API/getUsers.php"
        );
        const appointmentsRes = await axios.get(
          "http://localhost:8080/ip2_project/aastu_clinic/backend/API/appointmentInfo.php"
        );
        setUsers(usersRes.data.users || []);
        setAppointments(appointmentsRes.data.appointments || []);
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-blue-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Admin Dashboard</h1>
      <div className="flex gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 min-w-[200px] text-center">
          <div className="text-2xl font-semibold text-blue-700">
            {users.length}
          </div>
          <div className="text-gray-600">Total Users</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 min-w-[200px] text-center">
          <div className="text-2xl font-semibold text-blue-700">
            {appointments.length}
          </div>
          <div className="text-gray-600">Appointments</div>
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Recent Users
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 5).map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Recent Appointments
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Patient</th>
              <th className="p-2">Doctor</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice(0, 5).map((appt) => (
              <tr key={appt.id} className="border-b">
                <td className="p-2">{appt.patient_name}</td>
                <td className="p-2">{appt.doctor_name}</td>
                <td className="p-2">{appt.date}</td>
                <td className="p-2 capitalize">{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div className="mt-8 text-blue-700">Loading...</div>}
    </div>
  );
};

export default AdminDashboard;
