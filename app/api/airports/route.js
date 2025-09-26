import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { NextResponse } from "next/server";

let airportsData = null;

// Load airports CSV once
function loadAirports() {
  if (airportsData) return airportsData;

  const filePath = path.join(process.cwd(), "data", "airports.csv");
  const file = fs.readFileSync(filePath, "utf-8");

  const { data } = Papa.parse(file, {
    header: false, // OpenFlights has no headers
    skipEmptyLines: true,
  });

  // Map to a clean object
  airportsData = data.map((row) => ({
    id: row[0],
    name: row[1],
    city: row[2],
    country: row[3],
    iata: row[4],
    icao: row[5],
    lat: row[6],
    lon: row[7],
  }));

  return airportsData;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const airports = loadAirports();

  const results = airports
  .filter(
    (a) =>
       a.iata && a.iata !== "\\N" && a.iata.trim() !== "" && 
      (
        a.iata.toLowerCase().includes(query) ||
        a.city?.toLowerCase().includes(query) ||
        a.country?.toLowerCase().includes(query) ||
        a.name?.toLowerCase().includes(query)
      )
  )
  .slice(0, 10); // limit
    // console.log(results);
  return NextResponse.json(results);
  
}