// @/app/gallery/page.tsx
import GalleryContent from "@/sections/gallery/content";
import GalleryCTA from "@/sections/gallery/CTA";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Gallery | Li's Chinese Restaurant Nairobi",
  description:
    "Take a look inside Li's Chinese Restaurant. Browse our photo gallery showcasing the cosy atmosphere, authentic Chinese meals, and memorable dining experiences in Nairobi.",
};

// ✅ force static, no auto revalidation (only on-demand ISR)
export const dynamic = "force-static";
export const revalidate = false;

export default async function GalleryPage() {
  const USER_ID = process.env.USER_ID;

  const { data, error } = await supabase
    .from("gallery")
    .select("id, title, description, is_published, image_url, category")
    .eq("user_id", USER_ID)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching gallery:", error.message);
    return <div>Failed to load gallery.</div>;
  }

  const items =
    data?.map((item) => ({
      id: String(item.id),
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image_url,
    })) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <GalleryContent galleryItems={items} />
      <GalleryCTA />
    </div>
  );
}
