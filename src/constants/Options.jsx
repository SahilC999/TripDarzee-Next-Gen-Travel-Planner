export const SelectTravelesList =[
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveller in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'Couples',
        desc: 'A romantic getaway for two',
        icon: '❤️',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A family that Wanders together',
        icon: '🏡',
        people: '3 to 5'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A group of thrill seekers',
        icon: '🤜🤛',
        people: '5 to 10'
    }
]

export const selectBudegtOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay consious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'A balance between quality and cost',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Treat yourself to the best',
        icon: '💸',
    }
]

export const AI_PROMPT = `Generate Travel Planner for Location: {location} for {totalDays} days  for {traveller} with {budget} budget, 
give me hotel option list with HotelName, HotelAddress, Price, HotelImage url, geo coordinates, ratings, descriptions and suggest 
itinerary with PlaceName, placeDetails, placeImage URl, geo coordinates, ticketPricing, ratings, time travel for each location for 
{totalDays} days with each day plan with best time to visit in JSON format`