"use client";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSignIn, openSignUp } = useClerk();
  const router = useRouter();
const { user, isSignedIn } = useAuth(); 
  
  const links = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Search" },
    { href: "/booking", label: "Booking" },
  ];

  // Redirect to home after login
  useEffect(() => {
    router.push("/");
    if (isSignedIn) {
  }
  }, [isSignedIn, router]);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          ✈️ AirlineApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:underline ${
                pathname === link.href ? "font-semibold underline" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Buttons */}
          <div className="flex space-x-3">
            {!isSignedIn ? (
              <>
                <button
                  onClick={() => openSignIn()}
                  className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => openSignUp()}
                  className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Register
                </button>
              </>
            ) : (
              <UserButton redirectUrl="/" />  
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block hover:underline ${
                pathname === link.href ? "font-semibold underline" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Buttons */}
          <div className="flex space-x-3 mt-3">
            {!isSignedIn ? (
              <>
                <button
                  onClick={() => {
                    openSignIn();
                    setMenuOpen(false);
                  }}
                  className="flex-1 text-center bg-white text-blue-600 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    openSignUp();
                    setMenuOpen(false);
                  }}
                  className="flex-1 text-center bg-green-500 px-3 py-2 rounded-md hover:bg-green-600"
                >
                  Register
                </button>
              </>
            ) : (
              <div className="flex-1 flex justify-center">
                <UserButton redirectUrl ="/" />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
