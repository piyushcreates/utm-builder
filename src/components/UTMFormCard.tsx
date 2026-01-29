"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface UTMFormCardProps {
  onGenerate: (url: string) => void;
}

const formSchema = z.object({
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).min(1, { message: "Website URL is required." }),
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
    // Automatically prefix https:// if no protocol is present
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
    onGenerate(""); // Clear generated URL on reset
  };

  return (
    <Card className="rounded-lg shadow-lg border-border">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Campaign Parameters</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Fill in the details to generate your UTM-tagged URL.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Website URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      className="h-10 rounded-md border-input ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground"
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
                <FormItem>
                  <FormLabel className="text-foreground">UTM Source</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="google"
                      className="h-10 rounded-md border-input ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground"
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
                <FormItem>
                  <FormLabel className="text-foreground">UTM Medium</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cpc"
                      className="h-10 rounded-md border-input ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground"
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
                <FormItem>
                  <FormLabel className="text-foreground">UTM Campaign</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="summer_sale"
                      className="h-10 rounded-md border-input ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground"
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
                <FormItem>
                  <FormLabel className="text-foreground">UTM Term (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="keyword"
                      className="h-10 rounded-md border-input ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground"
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
                <FormItem>
                  <FormLabel className="text-foreground">UTM Content (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="banner_ad"
                      className="h-10 rounded-md border-input ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="col-span-full flex justify-between p-0 mt-6">
              <Button type="button" variant="ghost" onClick={handleReset} className="rounded-md hover:opacity-80 transition-opacity">
                Reset
              </Button>
              <Button type="submit" disabled={!form.formState.isValid} className="rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Generate URL
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UTMFormCard;