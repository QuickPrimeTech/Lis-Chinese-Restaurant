// @/app/gallery/page.tsx
import { supabase } from "@/lib/supabase/server";
import { Metadata } from "next";
import GalleryContent from "@/sections/gallery/content";
import GalleryCTA from "@/sections/gallery/CTA";

export const metadata: Metadata = {
  title: "Our Gallery",
  description:
    "Take a look inside Li's Chinese Restaurant. Browse our photo gallery showcasing the cosy atmosphere, authentic Chinese meals, and memorable dining experiences in Gigiri, Nairobi.",
};

// ✅ force static, no auto revalidation (only on-demand ISR)
// export const dynamic = "force-static";
// export const revalidate = false;

export default async function GalleryPage() {
  const branchId = process.env.BRANCH_ID!;

  const { data, error } = await supabase
    .from("gallery")
    .select("id, title, description, is_published, image_url, lqip, category")
    .eq("is_published", true)
    .eq("branch_id", branchId)
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
      lqip: item.lqip,
    })) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <GalleryContent galleryItems={items} />
      <GalleryCTA />
    </div>
  );
}
