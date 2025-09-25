"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const currentPath = usePathname();
  const navLinks = [
    { href: "/admin/allUsers", label: "All Users" },
    { href: "/admin/bookings", label: "All Booked Tickets" },
    
  ];

  return (
    <nav className="bg-gray-600 text-white p-4 flex space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={currentPath.startsWith(link.href) ? "font-bold underline" : ""}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
