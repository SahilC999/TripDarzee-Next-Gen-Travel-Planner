import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { IoIosShareAlt } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useEffect } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({trip}) {

    const [PhotoUrl, setPhotoUrl] = useState()
    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])
    
    const GetPlacePhoto = async() => {
        const data={
            textQuery: trip?.userSelection?.location?.label,
        };
        const result =await GetPlaceDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name );
            setPhotoUrl(PhotoUrl);
            
        })
    }
  return (
   <>
        <img src={PhotoUrl?PhotoUrl:'/placeholder.svg'} className='h-[340px] w-full object-cover rounded' />

        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
            <h2 className='text-2xl font-bold'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 bg-gray-300 px-3 rounded-full text-gray-600 text-sm md:text-md'>📆 {trip?.userSelection?.noOfDays} Days</h2>
                    <h2 className='p-1 bg-gray-300 px-3 rounded-full text-gray-600 text-sm md:text-md'>💲 {trip?.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 bg-gray-300 px-3 rounded-full text-gray-600 text-sm md:text-md'>👤 No. of Travellers: {trip?.userSelection?.traveller} </h2>
                </div>
            </div>
            <Button > 
               <IoIosShareAlt />   
            </Button>
        </div>
   </> 
  )
}

export default InfoSection