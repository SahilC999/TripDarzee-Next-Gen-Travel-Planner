import axios from "axios";

const API_KEY = "vRVubt0vCRfoqOBQcY8AbJKSGLsxW3U6"; // Replace with your key
const API_URL = "https://test.api.amadeus.com/v2/shopping/flight-offers";

const getAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: "vRVubt0vCRfoqOBQcY8AbJKSGLsxW3U6",
          client_secret: "u5NuKwrqRBwZ8Xoy"
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
  
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      return null;
    }
  };
  
  // Step 2: Fetch Flight Data
  export const fetchFlights = async (origin, destination, departureDate) => {
    const accessToken = await getAccessToken();
  
    if (!accessToken) {
      console.error("No Access Token Available");
      return null;
    }
  
    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v2/shopping/flight-offers",
        {
          params: {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departureDate,
            adults: 1,
            max: 5
          },
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error fetching flights:", error);
      return null;
    }
  };