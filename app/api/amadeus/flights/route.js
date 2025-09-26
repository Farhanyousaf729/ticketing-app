// import { NextResponse } from "next/server";
// import amadeus from "@/lib/amadeus";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     console.log(`Search Params: ${searchParams}`);
    
//     const origin = searchParams.get("origin");
//     const destination = searchParams.get("destination");
//     const departureDate = searchParams.get("departureDate");

//     if (!origin || !destination || !departureDate) {
//       return NextResponse.json({ error: "Missing params" }, { status: 400 });
//     }

//     const response = await amadeus.shopping.flightOffersSearch.get({
//       originLocationCode: origin,
//       destinationLocationCode: destination,
//       departureDate,
//       adults: "1",
//     });

//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error("Amadeus Search Error:", error);
//     return NextResponse.json({ error: "Failed to search flights" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import amadeus from "@/lib/amadeus";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const origin = searchParams.get("origin");
//     const destination = searchParams.get("destination");
//     const departureDate = searchParams.get("departureDate");
//     const returnDate = searchParams.get("returnDate"); // optional
//     const adults = searchParams.get("adults") || "1";
//     const children = searchParams.get("children") || "0";
//     const infants = searchParams.get("infants") || "0";
//     const travelClass = searchParams.get("travelClass") || "ECONOMY"; // ECONOMY, BUSINESS, etc.

//     if (!origin || !destination || !departureDate) {
//       return NextResponse.json({ error: "Missing required params" }, { status: 400 });
//     }

//     // Build request dynamically
//     const params = {
//       originLocationCode: origin,
//       destinationLocationCode: destination,
//       departureDate,
//       adults,
//       children,
//       infants,
//       travelClass,
//     };

//     if (returnDate) {
//       params.returnDate = returnDate;
//     }

//     const response = await amadeus.shopping.flightOffersSearch.get(params);

//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error("Amadeus Search Error:", error);
//     return NextResponse.json({ error: "Failed to search flights" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import amadeus from "@/lib/amadeus";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
       console.log(`Search Params: ${searchParams}`);
       
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate") || null;
    const adults = parseInt(searchParams.get("adults") || "1", 10);
    const children = parseInt(searchParams.get("children") || "0", 10);
    const infants = parseInt(searchParams.get("infants") || "0", 10);
    const travelClass = searchParams.get("travelClass") || "ECONOMY";
    const currencyCode = searchParams.get("currency") || "USD";
    const maxResults = parseInt(searchParams.get("max") || "20", 10);

    // --- Validation ---
    if (!origin || !destination || !departureDate) {
      return NextResponse.json({ error: "Missing required params" }, { status: 400 });
    }
    if (adults < 1) {
      return NextResponse.json({ error: "At least 1 adult is required" }, { status: 400 });
    }

    // --- Build request payload ---
    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      children,
      infants,
      travelClass,
      currencyCode,
      max: maxResults,
    };

    if (returnDate) {
      params.returnDate = returnDate;
    }

    // --- Call Amadeus API ---
    const response = await amadeus.shopping.flightOffersSearch.get(params);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Amadeus Search Error:", error);
    return NextResponse.json({ error: "Failed to search flights" }, { status: 500 });
  }
}
