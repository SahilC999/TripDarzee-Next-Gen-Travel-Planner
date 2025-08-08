import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const saveBooking = async (userId, bookingData) => {
  try {
    await addDoc(collection(db, "bookings"), {
      userId,
      ...bookingData,
      timestamp: new Date(),
    });
    console.log("Booking saved!");
  } catch (error) {
    console.error("Error saving booking:", error);
  }
};
