import doctor from "../../assets/doctor.png";
const About = () => {
	return (
		<section id="about" className="py-16 bg-blue-50">
			<div className="container mx-auto flex flex-col md:flex-row items-center md:justify-around mb-30">
				<div className="ml-20">
					<img
						src={doctor}
						alt="About AASTU Clinic"
						className="rounded-lg w-65 h-50"
					/>
				</div>
				<div className="md:w-1/2 md:mt-0">
					<h3 className="text-3xl font-bold mb-4">About Us</h3>
					<p className="text-lg mb-4">
						AASTU Clinic is committed to delivering high-quality
						healthcare services to our community. Our team of
						experienced professionals ensures that every patient
						receives personalized care.
					</p>
					<p className="text-lg mb-6">
						We strive to create a welcoming environment where your
						health and well-being are our top priorities.
					</p>
					<button
						className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition-all duration-300 border-2 border-white/40"
					>
						Learn More About Us
					</button>
				</div>
			</div>
		</section>
	);
};

export default About;
