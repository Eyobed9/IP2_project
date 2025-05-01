import {MedicalCard} from "@/components/Dashboard/MedicalCard"
import MyMedicalCard from "@/components/Dashboard/MyMedicalCard"
import { useEffect, useState } from "react";


const PatientDashboard = () => {
  const [available, setAvailable] = useState(false);
  useEffect(()=>{
    fetch("http://localhost:8080/ip2_project/aastu_clinic/backend/API/checkCard.php", {
      method: 'GET', credentials: "include"
    })
    .then((res)=>res.json())
    .then((data=> {
      if(data.success) {
        setAvailable(true);
      }
      else {
        setAvailable(false);
      }
    }))
  }, []);

  return (
    
	<div>
    {available ?
    <MyMedicalCard/> :
    <MedicalCard/>}</div>
  )
}

export default PatientDashboard