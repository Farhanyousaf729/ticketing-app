import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/config/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("Error in /api/authUser:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
