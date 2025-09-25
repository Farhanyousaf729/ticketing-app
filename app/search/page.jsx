"use client";
import dummyFlights from "@/dummyData";
import { useState, useEffect, useRef } from "react";

// Debounce function
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [flights, setFlights] = useState(dummyFlights);
  const [loadingFlights, setLoadingFlights] = useState(false);

  const debouncedOrigin = useDebounce(origin, 400);
  const debouncedDestination = useDebounce(destination, 400);

  const fetchAirports = async (query) => {
    if (!query) return [];
    try {
      const res = await fetch(`/api/airports?q=${query}`);
      const data = await res.json();
      return data.airports || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  useEffect(() => {
    async function getOriginSuggestions() {
      const suggestions = await fetchAirports(debouncedOrigin);
      setOriginSuggestions(suggestions);
    }
    if (debouncedOrigin) getOriginSuggestions();
    else setOriginSuggestions([]);
  }, [debouncedOrigin]);

  useEffect(() => {
    async function getDestinationSuggestions() {
      const suggestions = await fetchAirports(debouncedDestination);
      setDestinationSuggestions(suggestions);
    }
    if (debouncedDestination) getDestinationSuggestions();
    else setDestinationSuggestions([]);
  }, [debouncedDestination]);

  const handleSelect = (setter, suggestionsSetter, airport) => {
    setter(`${airport.city} (${airport.code})`);
    suggestionsSetter([]);
  };

  const handleSearchFlights = async () => {
    if (!origin || !destination) return;
    setLoadingFlights(true);
    try {
      const res = await fetch(
        `/api/flights?origin=${origin}&destination=${destination}`
      );
      const data = await res.json();
      setFlights(data.flights || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFlights(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">Search Flights</h1>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* Origin */}
        <div className="relative">
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
          />
          {originSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 border rounded bg-white max-h-48 overflow-y-auto z-20 shadow-md">
              {originSuggestions.map((airport) => (
                <li
                  key={airport.code}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    handleSelect(setOrigin, setOriginSuggestions, airport)
                  }
                >
                  {airport.city} ({airport.code}) - {airport.name},{" "}
                  {airport.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Destination */}
        <div className="relative">
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
          />
          {destinationSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 border rounded bg-white max-h-48 overflow-y-auto z-20 shadow-md">
              {destinationSuggestions.map((airport) => (
                <li
                  key={airport.code}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    handleSelect(
                      setDestination,
                      setDestinationSuggestions,
                      airport
                    )
                  }
                >
                  {airport.city} ({airport.code}) - {airport.name},{" "}
                  {airport.country}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Search Button */}
      <div className="text-center">
        <button
          onClick={handleSearchFlights}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loadingFlights ? "Searching..." : "Search Flights"}
        </button>
      </div>

      {/* Flights Results */}
      {flights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg">{flight.airline}</h2>
              <p>
                {flight.origin} → {flight.destination}
              </p>
              <p>Departure: {flight.time}</p>
              <p>Price: ${flight.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
