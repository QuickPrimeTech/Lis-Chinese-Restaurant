"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ShoppingCart, FileText, Wine } from "lucide-react";
import { toast } from "sonner";

// Dynamically import Document and Page to avoid SSR issues
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

// PDF paths (served from /public)
const MENU_PDFS = {
  food: "/food-menu.pdf",
  drinks: "/drinks-menu.pdf",
};

interface PDFViewerProps {
  file: string;
  onLoadSuccess?: (pdf: any) => void;
  onLoadError?: (error: Error) => void;
}

const PDFViewer = ({ file, onLoadSuccess, onLoadError }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);

  // ✅ configure pdfjs only on client
  useEffect(() => {
    import("react-pdf").then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
    });
  }, []);

  const onDocumentLoadSuccess = useCallback(
    (pdf: any) => {
      setNumPages(pdf?.numPages || 0);
      onLoadSuccess?.(pdf);
    },
    [onLoadSuccess]
  );

  const onDocumentLoadError = useCallback(
    (error: Error) => {
      console.error("PDF load error:", error);
      onLoadError?.(error);
    },
    [onLoadError]
  );

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-full h-96 bg-gray-200 rounded-lg animate-pulse shadow-lg"
        />
      ))}
    </div>
  );

  return (
    <Document
      file={file}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={onDocumentLoadError}
      loading={<LoadingSkeleton />}
      className="w-full"
    >
      <div className="space-y-6">
        {Array.from(new Array(numPages), (_, index) => (
          <div
            key={`page_wrapper_${index + 1}`}
            className="flex justify-center"
          >
            <Page
              pageNumber={index + 1}
              className="rounded-lg overflow-hidden shadow-lg"
              width={800}
              loading={
                <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse" />
              }
            />
          </div>
        ))}
      </div>
    </Document>
  );
};

export function MenuViewer() {
  const [activeTab, setActiveTab] = useState<"food" | "drinks">("food");

  const handleDownload = useCallback(() => {
    const currentPdf = activeTab === "food" ? MENU_PDFS.food : MENU_PDFS.drinks;
    const menuType = activeTab === "food" ? "Food Menu" : "Drinks Menu";

    const link = document.createElement("a");
    link.href = currentPdf;
    link.download = `${menuType.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Download Started. ${menuType} is being downloaded.`);
  }, [activeTab]);

  const handleOrderNow = useCallback(() => {
    toast.info("Order Now. Redirecting to order flow...");
    setTimeout(() => {
      alert("Redirect to order flow");
    }, 500);
  }, []);

  const handlePDFLoadError = useCallback((error: Error) => {
    console.error("PDF load error:", error);
    toast.error(
      "Menu Unavailable. Sorry, the menu couldn't be loaded. Please try again later."
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Menu</h1>
          <p className="text-gray-600 text-lg">
            Discover our carefully crafted dishes and premium beverages
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white rounded-lg shadow-lg">
            <TabsTrigger
              value="food"
              className="flex items-center gap-2 justify-center py-4 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4" />
              Food Menu
            </TabsTrigger>
            <TabsTrigger
              value="drinks"
              className="flex items-center gap-2 justify-center py-4 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Wine className="w-4 h-4" />
              Drinks Menu
            </TabsTrigger>
          </TabsList>

          {/* Content */}
          <div className="space-y-6">
            <TabsContent value="food" className="mt-0">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <PDFViewer
                      file={MENU_PDFS.food}
                      onLoadError={handlePDFLoadError}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drinks" className="mt-0">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <PDFViewer
                      file={MENU_PDFS.drinks}
                      onLoadError={handlePDFLoadError}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={handleDownload}
                className="flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Menu
              </Button>

              <Button
                size="lg"
                onClick={handleOrderNow}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                Order Now
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
