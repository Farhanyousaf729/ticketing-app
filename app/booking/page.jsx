"use client";

import { useSearchParams } from "next/navigation";

export default function BookingPage() {
  const params = useSearchParams();
  const flightId = params.get("id");

  // Mock flight lookup
  const flights = {
    1: { airline: "PIA", price: 250, time: "10:00 AM" },
    2: { airline: "Emirates", price: 400, time: "02:00 PM" },
    3: { airline: "Qatar Airways", price: 380, time: "06:00 PM" },
  };

  const flight = flights[flightId];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Page</h1>

      {flight ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">{flight.airline}</h2>
          <p className="mb-2">
            {flight.time} — <span className="font-bold">${flight.price}</span>
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      ) : (
        <p>No flight selected.</p>
      )}
    </main>
  );
}
