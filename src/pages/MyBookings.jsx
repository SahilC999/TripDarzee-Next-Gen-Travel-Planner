import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index} className="border p-2 my-2">
            <p>🛫 {booking.itineraries[0].segments[0].departure.iataCode} → 🛬 {booking.itineraries[0].segments[0].arrival.iataCode}</p>
            <p>💰 Price: ${booking.price.total}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
