import { useEffect, useState } from "react";
import CreateMedicalReport from "@/components/Dashboard/CreateMedicalReport";
import DoctorMedicalView from "@/components/Dashboard/DoctorMedicalView";

const DoctorDashboard = () => {
	const [hasMedicalCard, setHasMedicalCard] = useState(false);

	useEffect(() => {
		fetch("http://localhost:8080/ip2_project/aastu_clinic/backend/API/checkCard.php", {
			method: "GET",
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => {
				setHasMedicalCard(data.success);
			})
			.catch((error) => {
				console.error("Error checking medical card:", error);
			});
	}, []);

	return (
		<div className="flex gap-10 mx-auto justify-center">
			{hasMedicalCard ? <CreateMedicalReport /> : <DoctorMedicalView />}
		</div>
	);
};

export default DoctorDashboard;
