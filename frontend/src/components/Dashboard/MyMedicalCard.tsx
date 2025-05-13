import MedicalCardData from '@/models/MedicalCardData';
import {useEffect, useState} from 'react';


const MyMedicalCard = () => {

  const [data, setData] = useState<MedicalCardData>({});
  useEffect(()=>{
      fetch("http://localhost:8080/ip2_project/aastu_clinic/backend/API/sendCardInfo.php", {
        method: 'GET', credentials: "include"
      })
      .then((res)=>res.json())
      .then((data=> {
        if(data.success) {
          setData(data.content);
        }
      }))
    }, []);

	return (
		<div className="flex flex-col place-items-center justify-center">
			<div className="mb-40 bg-blue-50 flex flex-row w-fit h-fit justify-center gap-12 p-10 md:border md:rounded-2xl md:shadow-xl">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<h2 className="text-center text-xl font-bold text-blue-600 dark:text-white/90 lg:mb-6">
							Medical card
						</h2>
            <div className="w-30 h-30  overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 mx-auto">
              <img src={`http://localhost:8080/ip2_project/aastu_clinic/backend/public/${data.profilePic}`} alt="user" />
            </div>
                
						<div className="grid mt-4 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Fullname
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{data.name}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Department
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{data.department}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Email address
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{data.email}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Phone
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{data.phone}
								</p>
							</div>
              <div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Age
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{data.age}
								</p>
							</div>
              <div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Gender
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{data.gender}
								</p>
							</div>

							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Bloodtype
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{data.bloodType}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyMedicalCard;
