import React from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function UserTripCardItem({trip}) {

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
    <Link to={'/view-trip/' + trip?.id}>
        <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src={PhotoUrl?PhotoUrl:'/placeholder.svg'} className='object-cover rounded-xl mt-6 h-[300px] w-[300px]'/>
            <div>
                <h2
                className='font-bold text-lg'
                >{trip?.userSelection?.location?.label}</h2>

                <h2 className='text-sm text-gray-600 '>
                    {trip?.userSelection?.noOfDays} Days Trip with {trip?.userSelection?.budget} budget.
                </h2>
            </div>
        </div>
    </Link>
  )
}

export default UserTripCardItem