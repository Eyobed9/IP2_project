// import signin from "../assets/signin.png";
// import { useState } from "react";

// export const Signup = () => {
// 	const [formData, setFormData] = useState({
// 		name: "",
// 		email: "",
// 		password: "",
// 	});
// 	const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
//       e.preventDefault();

//       const response = await fetch("http://localhost:8080/ip2_project/aastu_clinic/backend/API/signup.php", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();
    
//       setMessage(data.message || data.error);
//   };

// 	return (
// 		<div className="flex flex-row w-screen h-screen gap-12 p-4 justify-center border border-black">
// 			<form onSubmit={handleSubmit} className="inline-flex flex-col justify-center items-center gap-5">
// 				<h2 className="text-black">Create an account</h2>
// 				<input
// 					type="text"
// 					name="name"
// 					placeholder="Name"
// 					className="rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
//           onChange={handleChange}
// 				/>
// 				<input
// 					type="email"
// 					name="email"
// 					placeholder="Email"
// 					className="rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
//           onChange={handleChange}
// 				/>
// 				<input
// 					type="password"
// 					name="password"
// 					placeholder="Password"
// 					className="rounded-md border border-gray-300 bg-white shadow-xs flex p-3 items-center gap-2 self-stretch h-6"
//           onChange={handleChange}
// 				/>
//         <p className="mt-4">{message}</p>
// 				<button
// 					type="submit"
// 					className="rounded-md flex text-white p-4 h-6 justify-center items-center gap-2 bg-blue-500"
// 				>
// 					Get Started
// 				</button>
// 			</form>
// 			<img
// 				className="w-75 h-100 shrink-0 my-30"
// 				src={signin}
// 				alt="Sign in"
// 			/>
// 		</div>
// 	);
// };
