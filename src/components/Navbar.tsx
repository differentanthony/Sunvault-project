"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../context/AuthContex";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Handle scroll event efficiently
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // List of pages where Navbar should be hidden
  if (pathname.startsWith("/dashboard") || pathname === "/login" || pathname === "/register") return null;

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/90 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/img/logo.PNG"
            alt="Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          {user ? (
            <>
              <Link href="/" className="hover:text-[#FFD700] transition">Home</Link>
              <Link href="/investments" className="hover:text-[#FFD700] transition">Investments</Link>
              <Link href="/dashboard" className="hover:text-[#FFD700] transition">Dashboard</Link>
              <button 
                onClick={logout} 
                className="hover:text-red-400 transition focus:outline-none focus:ring-2 focus:ring-red-500 px-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-green-400 transition">Login</Link>
              <Link href="/register" className="hover:text-green-400 transition">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <Menu size={30} />
        </button>
      </div>

      {/* Full-Screen Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center transition-all duration-300"
          onClickCapture={() => setIsMenuOpen(false)} // Close menu when clicking anywhere
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 p-2 sm:top-5 sm:right-5 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={32} className="text-white hover:text-red-400 transition" />
          </button>

          {/* Menu Items */}
          <div className="flex flex-col space-y-6 text-xl sm:text-2xl text-white font-semibold">
            {user ? (
              <>
                <Link href="/" className="hover:text-[#FFD700] transition">Home</Link>
                <Link href="/investments" className="hover:text-[#FFD700] transition">Investments</Link>
                <Link href="/dashboard" className="hover:text-[#FFD700] transition">Dashboard</Link>
                <button 
                  className="text-lg sm:text-xl hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 px-2 rounded"
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-lg sm:text-xl hover:text-green-400 transition">Login</Link>
                <Link href="/register" className="text-lg sm:text-xl hover:text-green-400 transition">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
