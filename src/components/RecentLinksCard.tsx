"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Trash2, Link as LinkIcon, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface RecentLink {
  id: string;
  url: string;
  timestamp: number;
}

interface RecentLinksCardProps {
  links: RecentLink[];
  onDelete: (id: string) => void;
}

const RecentLinksCard: React.FC<RecentLinksCardProps> = ({ links, onDelete }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The UTM link is ready to use.",
    });
  };

  return (
    <Card className="bg-background-panel border-none shadow-none rounded-[20px] p-6 md:p-8 h-full flex flex-col">
      <CardHeader className="px-0 pt-0 pb-6 md:pb-8">
        <div className="text-[0.6875rem] font-bold tracking-[0.15em] uppercase text-primary mb-3">
          History
        </div>
        <CardTitle className="text-2xl md:text-[1.75rem] font-bold tracking-tight mb-2">Recent Links</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-hidden">
        {links.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted/40 py-12">
            <LinkIcon size={40} className="mb-4 opacity-20" />
            <p className="text-sm font-bold uppercase tracking-wider">No links generated yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {links.map((link) => (
                <div 
                  key={link.id}
                  className="group bg-white rounded-[12px] p-4 border border-foreground/5 hover:border-primary/20 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-muted truncate mb-1">
                        {new URL(link.url).hostname}
                      </p>
                      <p className="text-[14px] font-bold text-foreground truncate">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 px-3 rounded-[6px] border-foreground/5 bg-foreground/[0.02] text-[12px] font-bold hover:bg-primary hover:text-white hover:border-primary transition-all flex-1"
                      onClick={() => copyToClipboard(link.url)}
                    >
                      <Copy size={14} className="mr-2" />
                      Copy
                    </Button>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-3 rounded-[6px] border border-foreground/5 bg-foreground/[0.02] text-[12px] font-bold hover:bg-foreground/5 transition-all inline-flex items-center justify-center"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-9 w-9 p-0 rounded-[6px] text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      onClick={() => onDelete(link.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentLinksCard;
