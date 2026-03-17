"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface UTMFormCardProps {
  onGenerate: (url: string) => void;
}

const formSchema = z.object({
  websiteUrl: z.string()
    .min(1, { message: "Website URL is required." })
    .refine((val) => {
      let processedVal = val;
      if (!processedVal.startsWith("http://") && !processedVal.startsWith("https://")) {
        processedVal = `https://${processedVal}`;
      }
      try {
        new URL(processedVal);
        return true;
      } catch {
        return false;
      }
    }, { message: "Please enter a valid URL." }),
  utmSource: z.string().min(1, { message: "UTM Source is required." }),
  utmMedium: z.string().min(1, { message: "UTM Medium is required." }),
  utmCampaign: z.string().min(1, { message: "UTM Campaign is required." }),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
});

const UTMFormCard: React.FC<UTMFormCardProps> = ({ onGenerate }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteUrl: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let processedUrl = values.websiteUrl;
    if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) {
      processedUrl = `https://${processedUrl}`;
    }

    const params = new URLSearchParams();
    if (values.utmSource) params.append("utm_source", values.utmSource);
    if (values.utmMedium) params.append("utm_medium", values.utmMedium);
    if (values.utmCampaign) params.append("utm_campaign", values.utmCampaign);
    if (values.utmTerm) params.append("utm_term", values.utmTerm);
    if (values.utmContent) params.append("utm_content", values.utmContent);

    const baseUrl = new URL(processedUrl);
    baseUrl.search = params.toString();
    onGenerate(baseUrl.toString());
  };

  const handleReset = () => {
    form.reset();
    onGenerate("");
  };

  return (
    <Card className="bg-background-panel border-none shadow-none rounded-[20px] p-8">
      <CardHeader className="px-0 pt-0 pb-8">
        <div className="text-[0.6875rem] font-bold tracking-[0.15em] uppercase text-primary mb-3">
          Configuration
        </div>
        <CardTitle className="text-[1.75rem] font-bold tracking-tight mb-2">Campaign Parameters</CardTitle>
        <CardDescription className="text-base text-muted/80">
          Fill in the details to generate your high-performance UTM-tagged URL.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground">Website URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example.com"
                        className="h-14 rounded-[8px] border-foreground/10 bg-white px-4 focus:ring-primary focus:border-primary transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="utmSource"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground">UTM Source</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="google, facebook, newsletter"
                        className="h-14 rounded-[8px] border-foreground/10 bg-white px-4 focus:ring-primary focus:border-primary transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="utmMedium"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground">UTM Medium</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="cpc, organic, email"
                        className="h-14 rounded-[8px] border-foreground/10 bg-white px-4 focus:ring-primary focus:border-primary transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="utmCampaign"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground">UTM Campaign</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="product_launch, summer_sale"
                        className="h-14 rounded-[8px] border-foreground/10 bg-white px-4 focus:ring-primary focus:border-primary transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="utmTerm"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground">UTM Term (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="running_shoes"
                        className="h-14 rounded-[8px] border-foreground/10 bg-white px-4 focus:ring-primary focus:border-primary transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="utmContent"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground">UTM Content (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="banner_top, button_click"
                        className="h-14 rounded-[8px] border-foreground/10 bg-white px-4 focus:ring-primary focus:border-primary transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex items-center gap-4 pt-4 border-t border-foreground/5">
              <Button 
                type="submit" 
                disabled={!form.formState.isValid}
                className="h-14 px-10 rounded-[8px] bg-primary text-white font-bold text-base hover:bg-accent-hover transition-colors"
              >
                Generate URL
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleReset}
                className="h-14 px-8 rounded-[8px] text-foreground font-bold hover:bg-foreground/5 transition-colors"
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UTMFormCard;