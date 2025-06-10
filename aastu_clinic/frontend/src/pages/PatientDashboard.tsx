import { useEffect, useState } from "react";
import { MedicalCard } from "@/components/PatientDashboard/MedicalCard";
import MyMedicalCard from "@/components/PatientDashboard/MyMedicalCard";
import AppointmentCard from "@/components/PatientDashboard/AppointmentCard";

const PatientDashboard = () => {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    fetch(
      "http://localhost/ip2_project/aastu_clinic/backend/API/checkCard.php",
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
    <div className="flex flex-col md:flex-row md:gap-10 mx-auto justify-center">
      {available ? <MyMedicalCard /> : <MedicalCard />}
      <AppointmentCard />
    </div>
  );
};

export default PatientDashboard;
