"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import UTMFormCard from "@/components/UTMFormCard";
import OutputCard from "@/components/OutputCard";
import RecentLinksCard from "@/components/RecentLinksCard";

interface RecentLink {
  id: string;
  url: string;
  timestamp: number;
}

const Index = () => {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<RecentLink[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("utm_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newHistory: RecentLink[]) => {
    setHistory(newHistory);
    localStorage.setItem("utm_history", JSON.stringify(newHistory));
  };

  const handleGenerateUrl = (url: string) => {
    setGeneratedUrl(url);
    if (url) {
      const newEntry: RecentLink = {
        id: crypto.randomUUID(),
        url,
        timestamp: Date.now(),
      };
      const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep last 50
      saveHistory(updatedHistory);
    }
  };

  const handleDeleteHistory = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    saveHistory(updatedHistory);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <main className="flex-1 w-full max-w-[1340px] mx-auto px-6 py-6 md:px-10 md:py-8 pb-12">
        <div className="mb-6 md:mb-8 text-center flex flex-col items-center" role="banner">
          <h1 className="text-4xl md:text-6xl leading-[1.1] md:leading-[1.0] font-extrabold tracking-[-0.04em] mb-4 whitespace-pre-wrap md:whitespace-normal">
            UTM <span className="text-primary">Builder</span>
          </h1>
          <p className="text-sm md:text-base leading-[1.5] md:leading-[1.6] text-muted max-w-2xl px-2 md:px-4">
            Streamline your campaign tracking with our premium UTM builder. 
            Generate clean, professional, and trackable URLs in seconds following the Social Masla standard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          <div className="lg:col-span-7">
            <UTMFormCard 
              onGenerate={handleGenerateUrl} 
            />
          </div>
          <div className="lg:col-span-5 h-full">
            <RecentLinksCard 
              links={history}
              onDelete={handleDeleteHistory}
            />
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