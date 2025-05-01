import About from "@/components/Home/About";
import Services from "@/components/Home/Services";
import { useNavigate } from "react-router-dom";
const Home = () => {

	const navigate = useNavigate();
	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero Section */}
			<section className="bg-blue-50 flex-1 flex items-center justify-center text-center py-20">
				<div>
					<h2 className="text-4xl font-bold mb-4">
						Welcome to AASTU Clinic
					</h2>
					<p className="text-lg mb-6">
						Providing exceptional healthcare services tailored to
						your needs.
					</p>
					<button onClick={()=>{navigate("/signup")}}className="bg-blue-600 font-bold text-white font-[100px] px-6 py-3 rounded-lg hover:bg-blue-700">
						Join us
					</button>
				</div>
			</section>

			{/* Services Section */}
			<Services/>
			
			{/* About Us Section */}
			<About/>
		</div>
	);
};

export default Home;
