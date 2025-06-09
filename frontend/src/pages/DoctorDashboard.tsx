import Appointment from "@/components/DoctorDashboard/Appointment";
import Card from "@/components/DoctorDashboard/Card";
import PatientLIst from "@/components/DoctorDashboard/PatientLIst";

const DoctorDashboard = () => {
	return (
		<div className="flex flex-col items-center h-200">
			<div className="flex w-full max-w-7xl gap-8 mt-8 justify-center items-start">
				<div className="flex flex-col gap-8 w-4/5">
					<div className="flex justify-center gap-10 place-items-center">
						<Card title="Total patients seen" num={50} />
						<Card title="Total appointments" num={10} />
					</div>
					<PatientLIst />
				</div>
				<div className="w-1/5 flex justify-end">
					<div
						className="w-full"
						style={{ maxHeight: "600px", overflowY: "auto" }}
					>
						<Appointment />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorDashboard;
