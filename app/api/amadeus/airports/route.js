// import amadeus from "@/lib/amadeus";
// import { NextResponse } from "next/server";

// export async function GET(request) {

//     try{
//         const { searchParams } = new URL(request.url);
//     const keyword = searchParams.get("keyword") || "";

//     if (!keyword || keyword.length < 2) {

//         const res = await amadeus.referenceData.locations.get({
//             keyword: keyword,
//             subType: "AIRPORT,CITY",
//         });
//         console.log(res.data);
        
//         return NextResponse.json(res.data);
//     }
//     }
//     catch(err){
//         console.error("Amadeus Airport Error:", err);
//         return NextResponse.json({ error: "Failed to fetch airports" }, { status: 500 });
//     }
    
// }

import amadeus from "@/lib/amadeus";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword") || "";

    // if (!keyword || keyword.length < 2) {
    //   return NextResponse.json(
    //     { error: "Keyword must be at least 2 characters" },
    //     { status: 400 }
    //   );
    // }

    const res = await amadeus.referenceData.locations.get({
      keyword,
      subType: "AIRPORT,CITY",
    });
    // Map to a simpler format
    const airports = (res.data || []).map((item) => ({
      id: item.id,
      iataCode: item.iataCode,
      name: item.name,
      city: item.address?.cityName,
      country:item.address?.countryName,
    }));
      console.log(res.data);
      
    
    return NextResponse.json(airports, { status: 200 });
    
  } catch (err) {
    console.error("Amadeus Airport Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch airports", details: err.message },
      { status: 500 }
    );
  }
}
