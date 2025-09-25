// app/admin/layout.jsx
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/config/db";
import userModel from "@/models/userModel";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import AdminNav from "./comonents/nav";

export default async function AdminLayout({ children }) {
  // Get auth info from request (server-side)
   const reqHeaders = headers();
  const { userId } = getAuth({ headers: reqHeaders });

  // Redirect if not logged in
  if (!userId) {
    redirect("/"); // user not logged in
  }

  // Connect to DB and fetch user
  await dbConnect();
  const user = await userModel.findOne({ clerkId: userId });

  // Redirect if user not found or not admin
  if (!user || user.role !== "admin") {
    redirect("/"); // not authorized
  }
 
   
  
  // Render admin pages
  return (
    <div className="min-h-screen bg-gray-50">
     <AdminNav />
      <main className="p-6">{children}</main>
    </div>
  );
}
