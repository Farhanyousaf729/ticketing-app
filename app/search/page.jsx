"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [originValue, setOriginValue] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationValue, setDestinationValue] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("oneway");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [currency, setCurrency] = useState("USD");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const [originFocused, setOriginFocused] = useState(false);
  const [destinationFocused, setDestinationFocused] = useState(false);

  const debouncedOrigin = useDebounce(origin, 400);
  const debouncedDestination = useDebounce(destination, 400);

  const currencies = [
    { code: "USD", label: "US Dollar", flag: "🇺🇸" },
    { code: "PKR", label: "Pakistani Rupee", flag: "🇵🇰" },
    { code: "EUR", label: "Euro", flag: "🇪🇺" },
    { code: "GBP", label: "British Pound", flag: "🇬🇧" },
    { code: "AED", label: "Dirham", flag: "🇦🇪" },
  ];

  const fetchAirports = async (query) => {
    if (!query) return [];
    try {
      const res = await fetch(
        `/api/amadeus/airports?keyword=${query.toUpperCase()}`
      );
      return await res.json();
    } catch (err) {
      console.error("Airport Fetch Error:", err);
      return [];
    }
  };

  useEffect(() => {
    async function loadOrigin() {
      const data = await fetchAirports(debouncedOrigin);
      setOriginSuggestions(data);
    }
    if (debouncedOrigin) loadOrigin();
    else setOriginSuggestions([]);
  }, [debouncedOrigin]);

  useEffect(() => {
    async function loadDestination() {
      const data = await fetchAirports(debouncedDestination);
      setDestinationSuggestions(data);
    }
    if (debouncedDestination) loadDestination();
    else setDestinationSuggestions([]);
  }, [debouncedDestination]);

  const handleSelect = (setter, setterValue, suggestionsSetter, airport) => {
    setter(`${airport.city} (${airport.iataCode})`);
    setterValue(airport.iataCode);
    suggestionsSetter([]);
  };

  const handleSearch = async () => {
    if (!originValue || !destinationValue || !departureDate) return;
    setLoading(true);
    try {
      const query = new URLSearchParams({
        origin: originValue,
        destination: destinationValue,
        departureDate,
        ...(tripType === "roundtrip" && returnDate ? { returnDate } : {}),
        adults,
        children,
        infants,
        travelClass,
        currency,
      });
      const res = await fetch(`/api/amadeus/flights?${query.toString()}`);
      const data = await res.json();
      setFlights(data || []);
    } catch (err) {
      console.error("Flight Search Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
        ✈ Flight Search
      </h1>

      {/* Trip Type */}
      <div className="flex gap-6 justify-center mb-4">
        {["oneway", "roundtrip"].map((type) => (
          <label
            key={type}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer font-medium transition ${
              tripType === type
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <input
              type="radio"
              value={type}
              checked={tripType === type}
              onChange={(e) => setTripType(e.target.value)}
              className="hidden"
            />
            {type === "oneway" ? "One-way" : "Round-trip"}
          </label>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Origin */}
        <div className="relative">
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              setOriginValue("");
              if (!e.target.value) setOriginSuggestions([]);
            }}
            onFocus={() => setOriginFocused(true)}
            onBlur={() => setTimeout(() => setOriginFocused(false), 150)}
            className="border p-4 rounded-xl w-full shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 transition"
          />
          {originFocused && originSuggestions.length > 0 && (
            <ul className="absolute w-full border rounded-xl bg-white max-h-52 overflow-y-auto shadow-lg z-30">
              {originSuggestions.map((a) => (
                <li
                  key={a.id}
                  className="p-3 hover:bg-blue-100 cursor-pointer transition"
                  onClick={() =>
                    handleSelect(
                      setOrigin,
                      setOriginValue,
                      setOriginSuggestions,
                      a
                    )
                  }
                >
                  {a.iataCode} - {a.name} ({a.country})
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
            onChange={(e) => {
              setDestination(e.target.value);
              setDestinationValue("");
              if (!e.target.value) setDestinationSuggestions([]);
            }}
            onFocus={() => setDestinationFocused(true)}
            onBlur={() => setTimeout(() => setDestinationFocused(false), 150)}
            className="border p-4 rounded-xl w-full shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 transition"
          />
          {destinationFocused && destinationSuggestions.length > 0 && (
            <ul className="absolute w-full border rounded-xl bg-white max-h-52 overflow-y-auto shadow-lg z-30">
              {destinationSuggestions.map((a) => (
                <li
                  key={a.id}
                  className="p-3 hover:bg-blue-100 cursor-pointer transition"
                  onClick={() =>
                    handleSelect(
                      setDestination,
                      setDestinationValue,
                      setDestinationSuggestions,
                      a
                    )
                  }
                >
                  {a.iataCode} - {a.name} ({a.country})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dates */}
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="border p-4 rounded-xl shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 transition w-full"
        />
        {tripType === "roundtrip" && (
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="border p-4 rounded-xl shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 transition w-full"
          />
        )}

        {/* Passengers */}
        {[
          { label: "Adults", state: adults, setter: setAdults, min: 1 },
          { label: "Children", state: children, setter: setChildren, min: 0 },
          { label: "Infants", state: infants, setter: setInfants, min: 0 },
        ].map((p) => (
          <div key={p.label}>
            <label className="block text-sm font-medium mb-1">{p.label}</label>
            <input
              type="number"
              min={p.min}
              value={p.state}
              onChange={(e) => p.setter(Number(e.target.value))}
              className="border p-3 rounded-xl shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 transition w-full"
            />
          </div>
        ))}

        {/* Travel Class */}
        <select
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
          className="border p-4 rounded-xl shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 transition w-full"
        >
          <option value="ECONOMY">Economy</option>
          <option value="PREMIUM_ECONOMY">Premium Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First</option>
        </select>

        {/* Currency */}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border p-4 rounded-xl shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 transition w-full"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code} - {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <div className="text-center mt-4">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 shadow-lg hover:shadow-xl transition text-lg font-semibold"
        >
          {loading ? "Searching..." : "Search Flights"}
         
        </button>

      </div>
       {loading && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>

                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-4/6" />
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-12 w-48" />
                  </div>
                </div>
              ))}
            </div>
          )}

      {/* Flights Results */}
      {flights.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* <img
                    src={`https://content.airhex.com/content/logos/airlines_80/${flight.validatingAirlineCodes[0].toUpperCase()}.png`}
                    alt={flight.validatingAirlineCodes[0]}
                    className="w-12 h-12 object-contain rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-airline.png";
                    }}
                  /> */}
                  <h2 className="font-bold text-lg">
                    {flight.validatingAirlineCodes.join(", ")}
                  </h2>
                </div>
                <p className="text-sm text-gray-500">
                  {tripType === "oneway" ? "One-way" : "Round-trip"}
                </p>
              </div>

              {flight.itineraries.map((itinerary, idx) => (
                <div key={idx} className="border-t border-gray-200 pt-4 mt-2">
                  {itinerary.segments.map((segment, sidx) => {
                    const depTime = new Date(segment.departure.at);
                    const arrTime = new Date(segment.arrival.at);
                    const dur = segment.duration
                      .replace("PT", "")
                      .replace("H", "h ")
                      .replace("M", "m");
                    return (
                      <div key={sidx} className="mb-3">
                        <p className="font-medium text-blue-700">
                          {segment.departure.iataCode} →{" "}
                          {segment.arrival.iataCode} ({segment.carrierCode}{" "}
                          {segment.number})
                        </p>
                        <p className="text-sm text-gray-600">
                          Departure:{" "}
                          {depTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          | Terminal: {segment.departure.terminal || "-"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Arrival:{" "}
                          {arrTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          | Terminal: {segment.arrival.terminal || "-"}
                        </p>
                        <p className="text-sm text-gray-600">Duration: {dur}</p>
                        {sidx < itinerary.segments.length - 1 && (
                          <p className="text-sm text-gray-500 mt-1">
                            Layover:{" "}
                            {Math.floor(
                              (new Date(
                                itinerary.segments[sidx + 1].departure.at
                              ) -
                                arrTime) /
                                (1000 * 60)
                            )}{" "}
                            min at {segment.arrival.iataCode}
                          </p>
                        )}
                      </div>
                    );
                  })}
                  <p className="text-sm font-medium mt-1">
                    Itinerary Duration:{" "}
                    {itinerary.duration
                      .replace("PT", "")
                      .replace("H", "h ")
                      .replace("M", "m")}
                  </p>
                </div>
              ))}

              <div className="mt-4 flex justify-between items-center">
                <p className="font-bold text-lg text-green-600">
                  {flight.price.currency} {flight.price.grandTotal}
                </p>
                <p className="text-sm text-gray-500">
                  Adults: {adults} | Children: {children} | Infants: {infants} |
                  Class: {travelClass}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
