
// "use client";
// import { useAuth } from "@/context/AuthContext";
// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useClerk, UserButton } from "@clerk/nextjs";
// import { Menu, X, LogIn, UserPlus, Heart, LayoutDashboard } from "lucide-react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { openSignIn, openSignUp } = useClerk();
//   const { user, isSignedIn, userData } = useAuth();

//   const links = [
//     { href: "/", label: "Home" },
//     { href: "/flights", label: "Flights" },
//     { href: "/about", label: "About" },
//   ];

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md sticky top-0 z-50 transition-all duration-300">
//       <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="text-2xl font-extrabold tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
//         >
//           ✈️ AirlineApp
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`hover:underline underline-offset-4 transition-all ${
//                 pathname === link.href ? "font-semibold underline" : ""
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}

//           {/* Admin Dashboard */}
//           {userData?.role === "admin" && (
//             <Link
//               href="/admin"
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition ${
//                 pathname === "/admin" ? "ring-2 ring-yellow-300" : ""
//               }`}
//             >
//               <LayoutDashboard size={18} />
//               Admin
//             </Link>
//           )}

//           {/* Wishlist */}
//           {isSignedIn && (
//             <Link
//               href="/wishlist"
//               className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
//             >
//               <Heart size={22} className="text-red-400" />
//             </Link>
//           )}

//           {/* Auth Buttons */}
//           <div className="flex space-x-3">
//             {!isSignedIn ? (
//               <>
//                 <button
//                   onClick={() => openSignIn()}
//                   className="flex items-center gap-2 bg-white text-blue-600 px-3 py-2 rounded-md shadow hover:bg-gray-100 transition"
//                 >
//                   <LogIn size={18} /> Login
//                 </button>
//                 <button
//                   onClick={() => openSignUp()}
//                   className="flex items-center gap-2 bg-green-500 px-3 py-2 rounded-md shadow hover:bg-green-600 transition"
//                 >
//                   <UserPlus size={18} /> Register
//                 </button>
//               </>
//             ) : (
//               <UserButton redirectUrl="/" />
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-2xl p-2 rounded-md hover:bg-blue-500 transition"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <div className="md:hidden bg-blue-700 px-6 py-4 space-y-4 shadow-lg animate-slideDown">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`block hover:underline underline-offset-4 ${
//                 pathname === link.href ? "font-semibold underline" : ""
//               }`}
//               onClick={() => setMenuOpen(false)}
//             >
//               {link.label}
//             </Link>
//           ))}

//           {/* Admin Dashboard for Mobile */}
//           {userData?.role === "admin" && (
//             <Link
//               href="/admin"
//               onClick={() => setMenuOpen(false)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition"
//             >
//               <LayoutDashboard size={18} /> Admin
//             </Link>
//           )}

//           {/* Wishlist */}
//           {isSignedIn && (
//             <Link
//               href="/wishlist"
//               onClick={() => setMenuOpen(false)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
//             >
//               <Heart size={20} className="text-red-400" /> Wishlist
//             </Link>
//           )}

//           {/* Auth Buttons */}
//           <div className="flex flex-col gap-3 mt-3">
//             {!isSignedIn ? (
//               <>
//                 <button
//                   onClick={() => {
//                     openSignIn();
//                     setMenuOpen(false);
//                   }}
//                   className="flex items-center justify-center gap-2 bg-white text-blue-600 px-3 py-2 rounded-md shadow hover:bg-gray-100 transition"
//                 >
//                   <LogIn size={18} /> Login
//                 </button>
//                 <button
//                   onClick={() => {
//                     openSignUp();
//                     setMenuOpen(false);
//                   }}
//                   className="flex items-center justify-center gap-2 bg-green-500 px-3 py-2 rounded-md shadow hover:bg-green-600 transition"
//                 >
//                   <UserPlus size={18} /> Register
//                 </button>
//               </>
//             ) : (
//               <div className="flex justify-center">
//                 <UserButton redirectUrl="/" />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, UserButton } from "@clerk/nextjs";
import {
  Menu,
  X,
  Heart,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSignIn, openSignUp } = useClerk();
  const { isSignedIn, userData } = useAuth();

  const links = [
    { href: "/", label: "Home" },
    { href: "/flights", label: "Flights" },
    { href: "/about", label: "About" },
  ];

  const handleWishlistClick = () => {
    if (!isSignedIn) {
      openSignIn(); // Suggest login if not signed in
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-2 md:px-6 py-3 md:py-3 flex justify-between items-center">
        {/* Logo (Image + Text) */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-xl tracking-wide hover:scale-105 transition-transform"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8 rounded-full shadow-md"
          />
          AirlineApp
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:underline underline-offset-4 transition-all ${
                pathname === link.href ? "font-semibold underline" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section (Icons) */}
        <div className="flex items-center gap-1 md:gap-4">
          {/* Wishlist (always visible) */}
          <button
            onClick={handleWishlistClick}
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <Heart size={22} className="text-red-400" />
          </button>

          {/* Admin Dashboard */}
          {userData?.role === "admin" && (
            <Link
              href="/admin"
              className="p-2 rounded-full hover:bg-white/20 transition"
            >
              <LayoutDashboard size={22} />
            </Link>
          )}

          {/* Auth / User */}
          {!isSignedIn ? (
            <>
              <button
                onClick={() => openSignIn()}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <LogIn size={22} />
              </button>
              <button
                onClick={() => openSignUp()}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <UserPlus size={22} />
              </button>
            </>
          ) : (
            <UserButton redirectUrl="/" />
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/20 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-4 shadow-lg animate-slideDown">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block hover:underline underline-offset-4 ${
                pathname === link.href ? "font-semibold underline" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
