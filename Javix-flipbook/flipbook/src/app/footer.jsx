"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
     <footer className="bg-white shadow-inner border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
        
        {/* Logo + Info */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src="/image/logo.png"
            alt="Flipbook Maker Logo"
            className="w-20 h-20 object-contain"
          />
          <div>
            <h2 className="text-lg font-bold text-green-600">Flipbook Maker</h2>
            <p className="text-gray-700 text-sm max-w-xs">
              Turn your PDFs into interactive flipbooks easily — free, fast, and ad-free.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-5 text-sm font-semibold">
          <Link
            href="/about"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            Privacy
          </Link>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 border-t border-gray-200 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Javix Technologies. All rights reserved.
      </div>
    </footer>
  );
}