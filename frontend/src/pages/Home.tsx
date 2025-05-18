import About from "@/components/Home/About";
import Services from "@/components/Home/Services";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
            {/* Hero Section */}
            <section
                className="flex-1 flex items-center justify-center text-center relative"
                style={{
                    minHeight: "calc(100vh - 64px)", // Adjust 64px to your header height
                    backgroundImage: "url('/src/assets/digitaldoc.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="bg-white/20 shadow-2xl rounded-2xl px-8 py-10 w-full max-w-2xl mx-auto flex flex-col items-center backdrop-blur-md border border-blue-200">
                    <h2 className="text-4xl font-extrabold mb-6 text-blue-800 drop-shadow font-serif">
                        Welcome to AASTU Clinic
                    </h2>
                    <p className="text-lg mb-8 text-gray-700">
                        Providing exceptional healthcare services tailored to
                        your needs.
                    </p>
                    <button
                        onClick={() => { navigate("/signup"); }}
                        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-bold text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition-all duration-300 mb-6 border-2 border-white/40"
                    >
                        Join us
                    </button>
                    {/* Links to sections */}
                    <div className="flex gap-20 mt-4">
                        <a
                            href="#services"
                            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-semibold shadow-md hover:from-blue-500 hover:to-blue-700 hover:scale-105 transition-all duration-300 border-2 border-white/40"
                        >
                            Our Services
                        </a>
                        <a
                            href="#about"
                            className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-blue-600 text-white font-semibold shadow-md hover:from-green-500 hover:to-blue-700 hover:scale-105 transition-all duration-300 border-2 border-white/40"
                        >
                            About Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <div id="services">
                <Services />
            </div>
            
            {/* About Us Section */}
            <div id="about">
                <About />
            </div>
        </div>
    );
};

export default Home;
