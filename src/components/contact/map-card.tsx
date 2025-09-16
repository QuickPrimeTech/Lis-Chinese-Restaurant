"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -1.2359695685600658,
  lng: 36.80700899545635,
};

export function MapCard() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  return (
    <>
      {/* Map Card */}
      <Card className="overflow-hidden shadow-lg py-0 mb-8">
        <CardContent className="p-0">
          <div className="aspect-video">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={center} />
              </GoogleMap>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Loading map...</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pb-3 bg-card w-full">
          <Button asChild variant="outline">
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.google.com/maps/place/Forodhani+Restaurant/@-4.0595868,39.6799082,17z/data=!3m1!4b1!4m6!3m5!1s0x1840131d814f3f19:0x22d4f7eb89d2d4cc!8m2!3d-4.0595868!4d39.6799082!16s%2Fg%2F11c1qspwll?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
            >
              Open in Google Maps
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
