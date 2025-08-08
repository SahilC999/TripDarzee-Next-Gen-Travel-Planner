import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrip() {
    const navigation = useNavigation();
    const [userTrip, setUserTrip] = useState([]);
  useEffect(() => {
    GetUserTrip();
  }, [])

  const GetUserTrip = async() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
      navigation('/');
      return;
    }
    
    const q =query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email))
    const querySnapshot = await getDocs(q);
    setUserTrip([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrip((prev) => [...prev, doc.data()]);
    });
  }

  return (
    <div className='sm:px-10 md:px-10 lg:px-56 px-5 mt-5'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 md:grid-col-3  gap-5'>
        {userTrip.length>0?userTrip.map((trip, index) => (
          <UserTripCardItem trip={trip} key={index}/>
        ))
      :[1,2,3,4,5,6].map((item, index) => {
        <div key={index} className='h-[300px] w-full bg-slate-200 animate-pulse rounded-xl'>

        </div>
      })
      }
      </div>
    </div>
  )
}

export default MyTrip