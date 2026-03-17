"use client";

import React from "react";

const Header = () => {
  return (
    <nav className="w-full bg-[#000000] py-6 mb-16 border-b border-white/10">
      <div className="max-w-[1340px] mx-auto px-10 flex items-center justify-between">
        <div className="text-white text-2xl font-bold tracking-tight">
          Social Masla
        </div>
        <div className="hidden md:flex gap-8 text-white/60 text-sm font-medium">
          <span className="text-white">UTM Builder</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;