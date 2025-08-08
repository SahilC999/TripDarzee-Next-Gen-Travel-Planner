import { Button } from '@/components/ui/Button';
import React from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({ place }) {

    const [PhotoUrl, setPhotoUrl] = useState()
         useEffect(() => {
            place && GetPlacePhoto();
        }, [place])
            
        const GetPlacePhoto = async() => {
            const data={
                textQuery: place.PlaceName,
            };
            const result =await GetPlaceDetails(data).then(resp => {
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name );
                setPhotoUrl(PhotoUrl);                
            })        
        }

  return (
    
        <div className="hover:scale-105 transition-all cursor-pointer border rounded-lg p-5 shadow-md">
            <img src={PhotoUrl?PhotoUrl:'/placeholder.svg'} className='rounded-xl h-[300px] w-full'/>
            <div>
                <h3 className="font-bold text-lg">{place.PlaceName}</h3>
                <p className="text-sm text-gray-600">{place.placeDetails}</p>
                <p className="text-sm mt-2">
                    <strong>⭐ Ratings:</strong> {place.ratings}
                </p>
                <p className="text-sm">
                    <strong>💵 Ticket Pricing:</strong> {place.ticketPricing}
                </p>
                <p className="text-sm">
                    <strong>🕓 Travel Time:</strong> {place.timeTravel}
                </p>
                <Link to={'https://www.google.com/maps/search/?api=1&query='+place.PlaceName} target='_blank'>
                    <Button className='flex align-bottom mt-2'><FaMapLocationDot /></Button>
                </Link>
            </div>
        </div>
   
  );
}

export default PlaceCardItem;
