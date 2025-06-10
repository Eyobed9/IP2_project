import medicalCard from "../../assets/medical-card.png";
import axios from "axios";
import { useState } from "react";

export const MedicalCard = () => {
  const [formData, setFormData] = useState({
    department: "",
    phone: "",
    gender: "",
    birthdate: "",
    bloodType: "",
  });
  const [message, setMessage] = useState("");

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
        "http://localhost/ip2_project/aastu_clinic/backend/API/medicalCard.php",
        form,
        { withCredentials: true } // Include credentials
      );
      if (response.data.success) {
        window.location.reload();
      }
      setMessage(response.data.error);
    } catch {
      setMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-40 bg-blue-50 flex flex-row w-fit h-fit justify-center gap-12 p-10 border rounded-2xl md:shadow-xl">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="inline-flex flex-col justify-center items-center gap-8"
        >
          <h2 className="text-black shadow-blue-700 ml-5">
            Get your Medical card
          </h2>
          <div className="flex gap-10 ">
            <div className="flex flex-col gap-10">
              <div>
                <label
                  htmlFor="department"
                  className="text-sm/6 block font-medium text-gray-900"
                >
                  Department
                  <span className="text-red-600">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  className="mt-2 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex items-center gap-2 self-stretch h-7"
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select your department
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Food Science and nutrition">
                    Food Science and nutrition
                  </option>
                  <option value="Geology">Geology</option>
                </select>
              </div>
              <div className="mt-0">
                <label
                  htmlFor="phone"
                  className="text-sm/6 block font-medium text-gray-900"
                >
                  Phone<span className="text-red-600">*</span>
                </label>
                <input
                  id="phone"
                  type="phone"
                  name="phone"
                  placeholder="Enter your phone num"
                  value={formData.phone}
                  className="mt-2 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex items-center gap-2 self-stretch h-7"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div>
                <label
                  htmlFor="gender"
                  className="text-sm/6 block font-medium text-gray-900"
                >
                  Gender
                  <span className="text-red-600">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  className="mt-2 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex items-center gap-2 self-stretch h-7"
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select your gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mt-0">
                <label
                  htmlFor="birthdate"
                  className="text-sm/6 block font-medium text-gray-900"
                >
                  Birthdate
                  <span className="text-red-600">*</span>
                </label>
                <input
                  id="birthdate"
                  type="date"
                  name="birthdate"
                  placeholder="Enter your birthdate"
                  value={formData.birthdate}
                  className="mt-2 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex items-center gap-2 self-stretch h-7"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div>
                <label
                  htmlFor="bloodType"
                  className="text-sm/6 block font-medium text-gray-900"
                >
                  Blood type
                  <span className="text-red-600">*</span>
                </label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  className="mt-2 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300 rounded-md border border-gray-300 bg-white shadow-xs flex items-center gap-2 self-stretch h-7"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select your blood type
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <button
                type="submit"
                className="shadow-black rounded-md flex text-white border-none hover:shadow-sm hover:scale-[1.1] bg-blue-700 p-4  h-6 justify-center items-center gap-2"
              >
                Get Card
              </button>
            </div>
          </div>
          <p className=" text-red-500">{message}</p>
        </form>
        <img
          className="md:block w-50 h-50 hidden shrink-0 mt-10"
          src={medicalCard}
          alt="Sign Up"
        />
      </div>
    </div>
  );
};
