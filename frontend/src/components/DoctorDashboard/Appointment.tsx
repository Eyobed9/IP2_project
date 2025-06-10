import { useEffect, useState } from "react";

interface AppointmentData {
	id: string;
	patientName: string;
	date: string;
	time: string;
}

interface AppointmentCardProps {
	appointment: AppointmentData;
	onCancel: (id: string) => void;
}

const AppointmentCard = ({ appointment, onCancel }: AppointmentCardProps) => (
	<div className="mb-5 bg-blue-50 flex flex-col mx-auto w-full max-w-xs justify-between items-center gap-6 p-6 border rounded-2xl shadow-md">
		<div>
			<h5 className="text-lg text-blue-600 mb-1 font-semibold">
				{appointment.patientName}
			</h5>
			<p className="text-gray-700 text-sm">
				Date: <span className="font-medium">{appointment.date}</span>
			</p>
			<p className="text-gray-700 text-sm">
				Time: <span className="font-medium">{appointment.time}</span>
			</p>
		</div>
		<button
			className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
			onClick={() => onCancel(appointment.id)}
		>
			Cancel
		</button>
	</div>
);

const Appointment = () => {
	const [appointments, setAppointments] = useState<AppointmentData[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchAppointments = () => {
		setLoading(true);
		fetch(
			"http://localhost:8080/ip2_project/aastu_clinic/backend/API/Doctor_dashboard/appointmentD.php",
			{
				method: "GET",
				credentials: "include",
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setAppointments(
						data.content.map(
							(item: AppointmentData, idx: number) => ({
								id: item.id ?? String(idx), // fallback to idx if id is missing
								patientName: item.patientName,
								date: item.date,
								time: item.time,
							})
						)
					);
				}
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchAppointments();
	}, []);

	const handleCancel = (id: string) => {
		setAppointments((prev) => prev.filter((appt) => appt.id !== id));
	};

	return (
		<div className="flex flex-col items-start h-[100vh]">
			<div className="w-full max-w-xs bg-white rounded-2xl">
				<h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
					Appointments
				</h2>
				{loading ? (
					<p className="text-center text-gray-500">Loading...</p>
				) : appointments.length === 0 ? (
					<p className="text-center text-gray-400">
						No appointments found.
					</p>
				) : (
					<div
						className="flex flex-col items-center gap-4"
						style={{ maxHeight: "500px" }}
					>
						{appointments.map((appointment) => (
							<AppointmentCard
								key={appointment.id}
								appointment={appointment}
								onCancel={handleCancel}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Appointment;
