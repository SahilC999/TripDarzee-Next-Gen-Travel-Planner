import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqsData = [
    { 
        question: "How do I plan a trip with this website?", 
        answer: "Simply enter your preferences such as location, budget, and trip duration, and our AI will generate a customized itinerary for you." 
    },
    { 
        question: "Is this service free?", 
        answer: "Yes! Our trip planner is completely free to use, with no hidden charges." 
    },
    { 
        question: "Can I save my trips for future reference?", 
        answer: "Yes, once you generate a trip, it will be saved to your account for future access." 
    },
    { 
        question: "Does this work for international trips?", 
        answer: "Yes! You can plan trips for any location worldwide." 
    },
    { 
        question: "How do I contact customer support?", 
        answer: "You can reach out to our support team via the Contact Us page or email us at support@travelplanner.com." 
    }
];

const Faqs = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState(null);

    const filteredFaqs = faqsData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="sm:px-10 md:px-10 lg:px-56 px-5 mt-5">
            {/* Title */}
            <h2 className="font-bold text-3xl text-orange-600 text-center">
                FAQs - Frequently Asked Questions
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 text-center">
                Find answers to the most common questions about our travel planner.
            </p>

            {/* Search Bar */}
            <div className="mt-5 flex justify-center">
                <Input 
                    placeholder="🔍 Search FAQs..." 
                    className="w-full sm:w-3/4 md:w-1/2 p-3 border rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white transition-all duration-300"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* FAQs List */}
            <div className="mt-8">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="rounded-lg border dark:border-gray-700 shadow-lg bg-white dark:bg-gray-900 p-4 mb-4 transition-transform transform hover:scale-[1.02]"
                        >
                            <button 
                                className="w-full flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-white focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                            </button>
                            {openIndex === index && (
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 mt-5 text-center">
                        ❌ No results found for your search.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Faqs;

