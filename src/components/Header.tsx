"use client";

import React from "react";

const Header = () => {
  return (
    <div className="mb-10 text-center md:text-left">
      <h1 className="text-3xl font-semibold text-foreground mb-2">UTM Builder</h1>
      <p className="text-sm text-muted-foreground mb-4">Generate clean, trackable URLs in seconds.</p>
      <p className="text-sm text-foreground font-medium">
        Enter your website URL and campaign parameters below to generate a trackable link.
      </p>
    </div>
  );
};

export default Header;