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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <main className="w-full max-w-4xl mx-auto py-16">
        <Header />
        <UTMFormCard onGenerate={handleGenerateUrl} />
        <OutputCard generatedUrl={generatedUrl} />
      </main>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        Powered by Social Masla
      </footer>
    </div>
  );
};

export default Index;