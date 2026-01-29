"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
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
      // Optionally show an error toast here
    }
  };

  return (
    <Card className="rounded-lg shadow-lg border-border mt-8">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Generated URL</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md overflow-x-auto border border-border">
          <p className="font-mono text-sm text-foreground break-all">{generatedUrl}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={handleCopy} className="rounded-md border-input hover:bg-accent hover:text-accent-foreground transition-colors">
          <Copy className="mr-2 h-4 w-4" /> Copy URL
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OutputCard;