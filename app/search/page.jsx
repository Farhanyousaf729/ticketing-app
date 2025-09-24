"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const params = useSearchParams();
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");

  // Mock flight data
  const flights = [
    { id: 1, airline: "PIA", price: 250, time: "10:00 AM" },
    { id: 2, airline: "Emirates", price: 400, time: "02:00 PM" },
    { id: 3, airline: "Qatar Airways", price: 380, time: "06:00 PM" },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Flights from {from} → {to} on {date}
      </h1>

      <div className="grid gap-4">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="p-4 border rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{flight.airline}</p>
              <p className="text-sm text-gray-600">{flight.time}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">${flight.price}</p>
              <a
                href={`/booking?id=${flight.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
