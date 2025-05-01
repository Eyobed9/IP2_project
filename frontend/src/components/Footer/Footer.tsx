import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
	return (
		<>
			<footer className="absolute w-screen bottom-0 bg-blue-500 text-white py-6 mt-5">
				<div className="container mx-auto text-center">
					<p>
						&copy; {new Date().getFullYear()} AASTU Clinic. All
						rights reserved.
					</p>
					<div className="mt-4">
						<p>
							Contact us: +251-123-456-789 | info@aastuclinic.com
						</p>
						<div className="flex justify-center gap-4 mt-2">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline flex items-center gap-2"
							>
								<FaFacebook /> Facebook
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline flex items-center gap-2"
							>
								<FaTwitter /> Twitter
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline flex items-center gap-2"
							>
								<FaInstagram /> Instagram
							</a>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
