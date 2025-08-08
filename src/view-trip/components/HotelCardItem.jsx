import React from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({hotel}) {
    const [PhotoUrl, setPhotoUrl] = useState()
        useEffect(() => {
            hotel && GetPlacePhoto();
        }, [hotel])
        
        const GetPlacePhoto = async() => {
            const data={
                textQuery: hotel.HotelName,
            };
            const result =await GetPlaceDetails(data).then(resp => {
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name );
                setPhotoUrl(PhotoUrl);
                
            })
        }
  return (
    <div>
        <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.HotelName + ", "+hotel?.HotelAddress} target='_blank' >
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={PhotoUrl?PhotoUrl:'/placeholder.svg'} className='rounded-xl h-[200px] w-full'/>
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel.HotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.HotelAddress}</h2>
                    <h2 className='text-sm text-gray-700'>💵 {hotel?.Price}</h2>
                    <h2 className='text-xs text-gray-500'>{hotel.descriptions}</h2>
                    <h2 className='text-xs text-gray-700'>⭐ {hotel?.ratings}</h2>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default HotelCardItem