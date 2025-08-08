import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const TripList = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchTrips = async () => {
      const q = query(collection(db, "trips"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const tripData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTrips(tripData);
    };

    fetchTrips();
  }, [user]);

  return (
    <div>
      <h2>Your Trips</h2>
      {trips.map((trip) => (
        <div key={trip.id}>
          <h3>{trip.destination}</h3>
          <p>{trip.startDate} - {trip.endDate}</p>
        </div>
      ))}
    </div>
  );
};

export default TripList;
