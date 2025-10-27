import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const baseDir = "src/app";
const excludeDirs = ["api", "fonts"];

const priorityMap: Record<string, number> = {
  "/": 1.0,
  "/menu": 0.9,
  "/menu/pdf-menus": 0.6,
  "/reservations": 0.9,
  "/private-events": 0.8,
  "/gallery": 0.7,
  "/about": 0.6,
  "/contact": 0.7,
  "/careers": 0.5,
};

function getRoutes(dir: string, basePath = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory() && excludeDirs.includes(entry.name)) continue;

    const routePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      const hasPage =
        fs.existsSync(path.join(dir, entry.name, "page.tsx")) ||
        fs.existsSync(path.join(dir, entry.name, "page.jsx"));

      if (hasPage) routes.push(`/${routePath}`);

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
    priority: priorityMap[route] ?? 0.5, // default fallback priority
  }));
}
