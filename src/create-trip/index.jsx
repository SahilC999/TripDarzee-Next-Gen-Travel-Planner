import React, { useEffect, useState, useContext } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, selectBudegtOptions } from '@/constants/Options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/firebase/firebaseConfig'; 
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '@/context/DarkModeContext';

// Traveler Type Options
const travelerOptions = [
    { title: "Solo", desc: "Traveling alone", icon: "🧍‍♂️" },
    { title: "Couple", desc: "With a partner", icon: "👫" },
    { title: "Family", desc: "With family members", icon: "👨‍👩‍👧‍👦" },
    { title: "Friends", desc: "With friends", icon: "🧑‍🤝‍🧑" }
];

function CreateTrip() {
    const { darkMode } = useContext(DarkModeContext); 
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const onGenerateTrip = async () => {
        if (!formData?.budget || !formData?.location || !formData?.travelerType) {
            return toast("Please complete all fields.");
        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{travelerType}', formData?.travelerType)
            .replace('{budget}', formData?.budget);

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        setLoading(false);
        SaveAiTrips(result?.response?.text());
    };

    const SaveAiTrips = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AiTrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId);
    };

    return (
        <div className="sm:px-10 md:px-10 lg:px-56 px-5 mt-5">
            <h2 className="font-bold text-4xl text-gray-900 dark:text-white">
                Tell us your preferences 🏕️🌴
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Provide details, and our planner will create a **custom** trip itinerary!
            </p>

            <div className="mt-10 flex flex-col gap-10">
                {/* Destination */}
                <div>
                    <h2 className="text-xl my-3 font-medium text-gray-900 dark:text-white">
                        Where are you going?
                    </h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v) },
                            styles: {
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: darkMode ? "#1E293B" : "#ffffff",
                                    color: darkMode ? "#ffffff" : "#000000",
                                    borderColor: darkMode ? "#475569" : "#cccccc",
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: darkMode ? "#1E293B" : "#ffffff",
                                    color: darkMode ? "#ffffff" : "#000000",
                                }),
                            },
                        }}
                    />
                </div>
                <div>
                    <h2 className="text-xl my-3 font-medium text-gray-900 dark:text-white">
                        Trip Duration (Days)?
                    </h2>
                    <Input placeholder="Ex: 3" type="number"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
                </div>

               {/* Traveler Type (2 Cards per Row) */}
                <div>
                    <h2 className="text-xl my-3 font-medium text-gray-900 dark:text-white">
                        Who are you traveling with? 👥
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                        {travelerOptions.map((item, index) => (
                            <div key={index} 
                                onClick={() => handleInputChange('travelerType', item.title)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 transform 
                                    hover:scale-105 hover:shadow-lg dark:border-gray-700 text-center
                                    ${formData?.travelerType === item.title ? 'border-orange-500 bg-orange-100 dark:bg-orange-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="text-lg font-bold">{item.title}</h2>
                                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Budget (2 Cards per Row) */}
                <div>
                    <h2 className="text-xl my-3 font-medium text-gray-900 dark:text-white">
                        Budget 💰
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                        {selectBudegtOptions.map((item, index) => (
                            <div key={index} 
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 transform 
                                    hover:scale-105 hover:shadow-lg dark:border-gray-700 text-center
                                    ${formData?.budget === item.title ? 'border-orange-500 bg-orange-100 dark:bg-orange-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="text-lg font-bold">{item.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Generate Trip Button */}
            <div className="mt-14 flex justify-end mb-24">
                <Button 
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-lg"
                    onClick={onGenerateTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                        : 'Generate Trip'}
                </Button>
            </div>

            {/* Sign In Dialog */}
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-lg text-black">Sign In with Google</DialogTitle>
                        <DialogDescription>
                            <img className="h-24 w-32 mx-auto" src="/logo.png" alt="Logo" />
                            <Button className="w-full mt-5 flex gap-4 items-center">
                                <FcGoogle className="h-7 w-7" />
                                Sign in with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateTrip;
