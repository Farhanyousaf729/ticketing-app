"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  // Mock flight data
  const flights = [
    { id: 1, airline: "PIA", price: 250, time: "10:00 AM" },
    { id: 2, airline: "Emirates", price: 400, time: "02:00 PM" },
    { id: 3, airline: "Qatar Airways", price: 380, time: "06:00 PM" },
  ];

  return <main className="p-6">search page </main>;
}
