"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import UTMFormCard from "@/components/UTMFormCard";
import OutputCard from "@/components/OutputCard";

const Index = () => {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const handleGenerateUrl = (url: string) => {
    setGeneratedUrl(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 w-full max-w-[1340px] mx-auto px-10 py-20 pb-20">
        <div className="mb-16 text-center flex flex-col items-center">
          <h1 className="text-[5.5rem] leading-[1.0] font-extrabold tracking-[-0.04em] mb-6">
            UTM <span className="text-primary">Builder</span>
          </h1>
          <p className="text-[1.125rem] leading-[1.7] text-muted max-w-2xl px-4">
            Streamline your campaign tracking with our premium UTM builder. 
            Generate clean, professional, and trackable URLs in seconds following the Social Masla standard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-12">
            <UTMFormCard onGenerate={handleGenerateUrl} />
          </div>
          {generatedUrl && (
            <div className="lg:col-span-12 mt-8">
              <OutputCard generatedUrl={generatedUrl} />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-background-inverse text-white py-12">
        <div className="max-w-[1340px] mx-auto px-10 flex justify-center items-center">
          <div className="text-sm font-medium">
            <span className="text-white/40">Powered by </span>
            <a 
              href="https://socialmasla.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              Social Masla
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;