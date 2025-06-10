import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

interface Appointment {
  id?: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
}

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [physicianStats, setPhysicianStats] = useState<
    {
      physicianName: string;
      appointmentCount: number;
    }[]
  >([]);
  const [newPhysician, setNewPhysician] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const { loggedIn, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!loggedIn || role !== "admin") {
    //   navigate("/signin");
    //   return;
    // }
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost/ip2_project/aastu_clinic/backend/API/Doctor_dashboard/appointmentD.php"
        );
        const data = (res.data.content || []).map(
          (appt: {
            patientName: string;
            doctorName: string;
            date: string;
            time: string;
          }) => ({
            ...appt,
          })
        );
        setAppointments(data);
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    const fetchPhysicianStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost/ip2_project/aastu_clinic/backend/API/Doctor_dashboard/numbers.php"
        );
        setPhysicianStats(res.data.physicians || []);
      } catch {
        // handle error
      }
    };
    fetchAppointments();
    fetchPhysicianStats();
  }, [loggedIn, role, navigate]);

  const handleAddPhysician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhysician.trim()) return;
    setActionLoading(true);
    try {
      await axios.post(
        "http://localhost/ip2_project/aastu_clinic/backend/API/Doctor_dashboard/add_physician.php",
        {
          physicianName: newPhysician.trim(),
        }
      );
      setNewPhysician("");
      // Refresh list
      const res = await axios.get(
        "http://localhost/ip2_project/aastu_clinic/backend/API/Doctor_dashboard/numbers.php"
      );
      setPhysicianStats(res.data.physicians || []);
    } catch {
      // handle error
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePhysician = async (physicianName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${physicianName}?`))
      return;
    setActionLoading(true);
    try {
      await axios.post(
        "http://localhost/ip2_project/aastu_clinic/backend/API/Doctor_dashboard/delete_physician.php",
        {
          physicianName,
        }
      );
      // Refresh list
      const res = await axios.get(
        "http://localhost/ip2_project/aastu_clinic/backend/API/Doctor_dashboard/numbers.php"
      );
      setPhysicianStats(res.data.physicians || []);
    } catch {
      // handle error
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-blue-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Admin Dashboard</h1>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          All Appointments
        </h2>
        {loading ? (
          <div className="text-blue-700">Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="text-gray-500">No appointments found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2">Patient</th>
                <th className="p-2">Physician</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, idx) => (
                <tr key={appt.id ?? idx} className="border-b">
                  <td className="p-2">{appt.patientName}</td>
                  <td className="p-2">{appt.doctorName}</td>
                  <td className="p-2">{appt.date}</td>
                  <td className="p-2">{appt.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Physician stats section */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Physicians &amp; Appointment Counts
        </h2>
        {/* Add Physician Form */}
        <form onSubmit={handleAddPhysician} className="flex gap-4 mb-4">
          <input
            type="text"
            value={newPhysician}
            onChange={(e) => setNewPhysician(e.target.value)}
            placeholder="Add new physician name"
            className="border p-2 rounded w-1/2"
            disabled={actionLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={actionLoading}
          >
            Add Physician
          </button>
        </form>
        {physicianStats.length === 0 ? (
          <div className="text-gray-500">No physicians found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2">Physician</th>
                <th className="p-2">Appointments</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {physicianStats.map((doc, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{doc.physicianName}</td>
                  <td className="p-2">{doc.appointmentCount}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDeletePhysician(doc.physicianName)}
                      disabled={actionLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
