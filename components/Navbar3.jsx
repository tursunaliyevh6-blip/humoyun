"use client";

import React from "react";
import { Search } from "lucide-react";

export default function Navbar3() {
  return (
    <nav className="w-full bg-white shadow-md flex items-center justify-between px-16 py-3" style={{ height: "50px" }}>
      
      <div className="text-xl font-bold text-purple-700">
        Admin
      </div>

      <div className="flex-1 flex justify-center max-w-3xl mx-4">
        <div className="flex w-full border border-gray-300 rounded-full overflow-hidden shadow-sm">
          
          <div className="flex items-center justify-center px-4 bg-gray-100">
            <Search className="text-gray-500" size={20} />
          </div>
          
          <input
            type="text"
            placeholder="Qidiruv..."
            className="flex-1 py-1 px-6 text-base focus:outline-none "
            style={{ paddingRight: "10px" }} 
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
      </div>

    </nav>
  );
}