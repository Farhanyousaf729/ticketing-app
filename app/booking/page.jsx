// "use client";

// import { useState } from "react";

// export default function FlightSearch() {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [departureDate, setDepartureDate] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [passengers, setPassengers] = useState(1);
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/search-flights", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ origin, destination, departureDate, returnDate, passengers }),
//       });
//       const data = await res.json();
//       if (data.error) setError(data.error);
//       else setFlights(data.flights || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch flights");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Search Flights</h1>

//       <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Origin (IATA code)"
//           value={origin}
//           onChange={(e) => setOrigin(e.target.value.toUpperCase())}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Destination (IATA code)"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value.toUpperCase())}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="date"
//           value={departureDate}
//           onChange={(e) => setDepartureDate(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="date"
//           value={returnDate}
//           onChange={(e) => setReturnDate(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           value={passengers}
//           min={1}
//           onChange={(e) => setPassengers(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           {loading ? "Searching..." : "Search Flights"}
//         </button>
//       </form>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <div className="grid gap-4">
//         {flights.length === 0 && !loading && <p>No flights found.</p>}

//         {flights.map((flight, index) => (
//           <div
//             key={index}
//             className="p-4 bg-white shadow-md rounded-lg border"
//           >
//             <p className="font-semibold">
//               {flight.validatingAirline} — {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
//             </p>
//             <p>
//               Departure: {flight.itineraries[0].segments[0].departure.at}
//             </p>
//             <p>
//               Arrival: {flight.itineraries[0].segments.slice(-1)[0].arrival.at}
//             </p>
//             <p className="font-bold mt-2">Price: ${flight.price.total}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
