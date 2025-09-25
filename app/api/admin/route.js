import dbConnect from "@/config/db";
import userModel from "@/models/userModel";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {

    try {

        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }
    catch (err) {
        console.error("Error in /api/authUser:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
   
}
  