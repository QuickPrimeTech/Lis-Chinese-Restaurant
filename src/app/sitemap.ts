import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const baseDir = "src/app";
const excludeDirs = ["api", "fonts"];

export const revalidate = 86400; // once per day

function getRoutes(dir: string, basePath = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes: string[] = [];

  for (const entry of entries) {
    // skip excluded directories
    if (entry.isDirectory() && excludeDirs.includes(entry.name)) continue;

    const routePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // only include directories that contain a page.tsx or page.jsx
      const hasPage =
        fs.existsSync(path.join(dir, entry.name, "page.tsx")) ||
        fs.existsSync(path.join(dir, entry.name, "page.jsx"));

      if (hasPage) routes.push(`/${routePath}`);

      // recurse to find nested routes
      routes = routes.concat(getRoutes(path.join(dir, entry.name), routePath));
    }
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fullPath = path.join(process.cwd(), baseDir);
  const routes = ["/", ...getRoutes(fullPath)];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  }));
}
