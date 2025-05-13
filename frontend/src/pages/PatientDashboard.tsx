import { useEffect, useState } from "react";
import { MedicalCard } from "@/components/Dashboard/MedicalCard";
import MyMedicalCard from "@/components/Dashboard/MyMedicalCard";
import AppointmentCard from "@/components/Dashboard/AppointmentCard";

const PatientDashboard = () => {
	const [available, setAvailable] = useState(false);

	useEffect(() => {
		fetch(
			"http://localhost:8080/ip2_project/aastu_clinic/backend/API/checkCard.php",
			{
				method: "GET",
				credentials: "include",
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setAvailable(data.success);
			});
	}, []);

	return (
		<div className="flex gap-10 mx-auto justify-center">
			{available ? <MyMedicalCard /> : <MedicalCard />}
			<AppointmentCard />
		</div>
	);
};

export default PatientDashboard;
