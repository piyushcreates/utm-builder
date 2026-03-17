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
    <Card className="bg-background-panel border-none shadow-none rounded-[20px] p-5 md:p-6 h-full flex flex-col">
      <CardHeader className="px-0 pt-0 pb-4 md:pb-5">
        <div className="text-[0.625rem] font-bold tracking-[0.15em] uppercase text-primary mb-2">
          History
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold tracking-tight mb-1">Recent Links</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-hidden">
        {links.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted/40 py-8">
            <LinkIcon size={32} className="mb-3 opacity-20" />
            <p className="text-[12px] font-bold uppercase tracking-wider">No links yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[460px]">
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
