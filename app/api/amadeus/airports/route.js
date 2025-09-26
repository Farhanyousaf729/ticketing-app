import amadeus from "@/lib/amadeus";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword")?.trim();

    if (!keyword || keyword.length < 2) {
      return NextResponse.json([], { status: 200 });
    }

    const res = await amadeus.referenceData.locations.get({
      keyword,
      subType: "AIRPORT,CITY",
    });

    const airports = (res.data || []).map((item) => ({
      id: item.id,
      type: item.type,
      iataCode: item.iataCode,
      name: item.name,
      city: item.address?.cityName,
      country: item.address?.countryName,
    }));
    // console.log(res.data);

    return NextResponse.json(airports, { status: 200 });
  } catch (err) {
    console.error("Amadeus Airport Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch airports", details: err.message },
      { status: 500 }
    );
  }
}
