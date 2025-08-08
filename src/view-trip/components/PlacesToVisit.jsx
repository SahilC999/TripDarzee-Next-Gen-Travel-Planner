import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip.tripData?.travelPlan?.itinerary;

  if (!itinerary) {
    return <p>No itinerary data available</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div>
        {Object.entries(itinerary).map(([day, details]) => (
          <div key={day} className="mb-5">
            <h2 className="font-bold text-lg mb-3">{day} :</h2>
            <p className="text-gray-700 mb-3">
              {/* <strong>Best Time to Visit:</strong> {details.bestTimeToVisit} */}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
              {details.places.map((place, index) => (
                <PlaceCardItem key={index} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
