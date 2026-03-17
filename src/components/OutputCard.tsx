"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Link2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface OutputCardProps {
  generatedUrl: string | null;
}

const OutputCard: React.FC<OutputCardProps> = ({ generatedUrl }) => {
  if (!generatedUrl) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      showSuccess("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <Card className="bg-background-inverse text-white border-none shadow-none rounded-[20px] p-8 mt-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Link2 size={120} />
      </div>
      
      <CardHeader className="px-0 pt-0 pb-8 relative z-10">
        <div className="text-[0.6875rem] font-bold tracking-[0.15em] uppercase text-primary mb-3">
          Result
        </div>
        <CardTitle className="text-[1.75rem] font-bold tracking-tight mb-2">Generated URL</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 relative z-10">
        <div className="bg-white/5 p-6 rounded-[8px] border border-white/10 mb-8 backdrop-blur-sm">
          <p className="font-mono text-base text-white/90 break-all leading-relaxed">{generatedUrl}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleCopy} 
            className="h-14 px-10 rounded-[8px] bg-primary text-white font-bold text-base hover:bg-accent-hover transition-colors"
          >
            <Copy className="mr-2 h-5 w-5" /> Copy Link
          </Button>
          <Button 
            variant="outline" 
            asChild
            className="h-14 px-10 rounded-[8px] border-white/20 bg-transparent text-white font-bold text-base hover:bg-white/10 transition-colors"
          >
            <a href={generatedUrl} target="_blank" rel="noopener noreferrer">
              Open in Browser
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutputCard;