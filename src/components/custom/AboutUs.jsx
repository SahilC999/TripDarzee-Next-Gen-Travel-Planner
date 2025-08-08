import React from "react";
import { FaUserCircle } from "react-icons/fa";

const teamMembers = [
    { name: "Pranav Badar", bio: "Passionate about creating innovative travel solutions." },
    { name: "Saniya Bhagane",  bio: "Leading tech development to enhance user experience." },
    { name: "Saniya Gantayat",  bio: "Oversees product strategy and user growth." }
];

const AboutUs = () => {
    return (
        <div className="sm:px-10 md:px-10 lg:px-56 px-5 mt-5">
            {/* Title Section */}
            <h2 className="font-bold text-4xl text-center text-orange-600">
                About Us
            </h2>
            <p className="text-lg text-center text-gray-600 dark:text-gray-300 mt-2">
                Our mission is to revolutionize how people plan their trips. Learn more about us and the team behind the project.
            </p>

            {/* Mission Section */}
            <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">Our Mission</h3>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                    At Travel Planner, we believe in making travel planning easy, fun, and tailored to individual preferences.
                    Our platform provides personalized travel itineraries powered by AI, helping users create memorable
                    experiences with minimal effort.
                </p>
            </div>

            {/* Vision Section */}
            <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">Our Vision</h3>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                    Our vision is to become the go-to platform for seamless trip planning worldwide. We aim to empower
                    travelers by providing innovative tools and resources to create the perfect journey, whether for
                    relaxation, adventure, or exploration.
                </p>
            </div>

            {/* Values Section */}
            <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">Our Values</h3>
                <ul className="mt-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
                    <li>Customer-Centric: We prioritize user needs and satisfaction.</li>
                    <li>Innovation: We embrace cutting-edge technology for smarter travel planning.</li>
                    <li>Sustainability: We promote eco-friendly travel choices and responsible tourism.</li>
                </ul>
            </div>

            {/* Team Section */}
            <div className="mt-12">
                <h3 className="font-semibold text-2xl text-red-500 text-center">
                    Meet Our Team
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <FaUserCircle className="text-6xl text-gray-500 dark:text-gray-300 mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h4>
                            <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
                            <p className="mt-3 text-gray-600 dark:text-gray-300">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
