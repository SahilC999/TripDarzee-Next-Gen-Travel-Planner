import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { useEffect } from 'react';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
//import Footer from '../components/Footer';

function ViewTrip() {

    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);
    
    useEffect(() => {
       tripId&&GetTripData();
    }, [tripId]);
    
    const GetTripData = async() => {
        const docRef = doc(db, 'AiTrips', tripId);
        const docSnap =await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data())
        }
        else{
            console.log("No such document!");
            toast('No Trip Found!')
        }
    }
  return (
    <div className='p-19 md:px-20 lg:px-44 xl:px-56'>
        <InfoSection trip={trip} />
        <Hotels trip={trip} />
        <PlacesToVisit trip={trip} />
        {/* <Footer trip={trip} /> */}
    </div>
  )
}

export default ViewTrip