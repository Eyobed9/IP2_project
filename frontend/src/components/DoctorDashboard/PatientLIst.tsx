import { useEffect, useState } from "react";

interface Patient {
	id: string;
	profilePic?: string;
	name?: string;
	gender?: string;
	age?: number | string;
	bloodType?: string;
}

const PatientLIst = () => {
	const [patients, setPatients] = useState<Patient[]>([]);

	useEffect(() => {
		fetch(
			"http://localhost:8080/ip2_project/aastu_clinic/backend/API/Doctor_dashboard/patients.php",
			{
				method: "GET",
				credentials: "include",
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setPatients(data.content);
				}
			});
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-fit">
			<div className="w-full max-w-5xl bg-blue-50 rounded-2xl shadow-2xl p-8 mt-10 ">
				<h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
					Patient List
				</h2>
				<div
					className="overflow-x-auto rounded-2xl"
					style={{ maxHeight: "500px", overflowY: "auto" }}
				>
					<table className="min-w-full divide-y divide-gray-200 rounded-2xl">
						<thead className="bg-blue-200">
							<tr>
								<th className="px-4 py-2 text-left text-md font-medium text-gray-500 uppercase">
									Name
								</th>
								<th className="px-4 py-2 text-left text-md font-medium text-gray-500 uppercase">
									ID
								</th>
								<th className="px-4 py-2 text-left text-md font-medium text-gray-500 uppercase">
									Gender
								</th>
								<th className="px-4 py-2 text-left text-md font-medium text-gray-500 uppercase">
									Age
								</th>
								<th className="px-4 py-2 text-left text-md font-medium text-gray-500 uppercase">
									Blood Type
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{patients.map((patient) => (
								<tr key={patient.id}>
									<td className="px-4 py-2">
										<div className="w-12 h-12 overflow-hidden border border-gray-200 rounded-full mx-auto">
											<img
												src={
													patient.profilePic
														? `http://localhost:8080/ip2_project/aastu_clinic/backend/public/${patient.profilePic}`
														: "/default-profile.png"
												}
												alt="profile"
												className="object-cover w-full h-full"
											/>
										</div>
									</td>
									<td className="px-4 py-2 text-gray-800">
										{patient.name}
									</td>
									<td className="px-4 py-2 text-gray-800">
										{patient.gender}
									</td>
									<td className="px-4 py-2 text-gray-800">
										{patient.age}
									</td>
									<td className="px-4 py-2 text-gray-800">
										{patient.bloodType}
									</td>
								</tr>
							))}
							{patients.length === 0 && (
								<tr>
									<td
										colSpan={5}
										className="text-center py-6 text-gray-400"
									>
										No patients found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PatientLIst;
