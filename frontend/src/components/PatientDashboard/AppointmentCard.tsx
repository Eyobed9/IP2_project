import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentData from "@/models/AppointmentData";

const AppointmentCard = () => {
	const [formData, setFormData] = useState({
		date: "",
		physician: "",
		time: "",
	});

	// Get the appointment info if available
	useEffect(()=>{
		  fetch("http://localhost:8080/ip2_project/aastu_clinic/backend/API/appointmentInfo.php", {
			method: 'GET', credentials: "include"
		  })
		  .then((res)=>res.json())
		  .then((data=> {
			if(data.success) {
			  setData(data.content);
			  setIsScheduled(true);
			}
		  }))
		}, []);
	
	const [message, setMessage] = useState("");
	const [isScheduled, setIsScheduled] = useState(false);
	const [data, setData] = useState<AppointmentData>({});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const form = new FormData();
			form.append("user_data", JSON.stringify(formData));

			const response = await axios.post(
				"http://localhost:8080/ip2_project/aastu_clinic/backend/API/appointment.php",
				form,
				{ withCredentials: true } // Include credentials
			);
			if (response.data.success) {
				setIsScheduled(true)
				setData(response.data);
			}
			setMessage(response.data.error);
		} catch {
			setMessage("An error occurred while submitting the form.");
		}
	};

	return (
		<div className="flex flex-col place-items-center justify-center">
			<div className="mb-50 bg-blue-50 flex flex-row w-fit h-fit justify-center gap-12 p-10 border rounded-2xl md:shadow-xl">
				{isScheduled ? (
					<div className="text-center">
						<h5 className="text-xl font-bold text-blue-600 mb-2">
							Appointment Scheduled
						</h5>
						<p className="text-gray-700">
							<span className="font-semibold">Date:</span>{" "}
							{data.date}
						</p>
						<p className="text-gray-700">
							<span className="font-semibold">Physician:</span>{" "}
							{data.physician}
						</p>
						<p className="text-gray-700">
							<span className="font-semibold">Time:</span>{" "}
							{data.time}
						</p>
						<button
							className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
							onClick={() => setIsScheduled(false)}
						>
							Reschedule
						</button>
					</div>
				) : (
					<div className="text-center">
						<h5 className="text-xl font-bold text-blue-600 mb-4">
							Schedule an Appointment
						</h5>
						<form className="space-y-4" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="date"
									className="block text-gray-700 font-medium"
								>
									Pick the date:
								</label>
								<input
									id="date"
									name="date"
									value={formData.date}
									onChange={handleChange}
									type="date"
									className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="time"
									className="block text-gray-700 font-medium"
								>
									Pick the time:
								</label>
								<input
									id="time"
									name="time"
									value={formData.time}
									type="time"
									onChange={handleChange}
									className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="physician"
									className="block text-gray-700 font-medium"
								>
									Select a physician:
								</label>
								<select
									id="physician"
									name="physician"
									value={formData.physician}
									onChange={handleChange}
									className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								>
									<option value="" disabled selected>
										Choose a physician
									</option>
									<option value="Dr. Ethan Reynolds">
										Dr. Ethan Reynolds
									</option>
									<option value="Dr. Sophia Anderson">
										Dr. Sophia Anderson
									</option>
									<option value="Dr. Samuel Thompson">
										Dr. Samuel Thompson
									</option>
									<option value="Dr. Emily Martinez">
										Dr. Emily Martinez
									</option>
									<option value="Dr. Daniel Walker">
										Dr. Daniel Walker
									</option>
								</select>
							</div>
							<button
								type="submit"
								className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								Schedule
							</button>
							<p className=" text-red-500">{message}</p>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default AppointmentCard;
