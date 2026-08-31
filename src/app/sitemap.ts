import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cessl.org";

  const routes = [
    "/",
    "/about",
    "/programmes",
    "/impact-stories",
    "/donate",
    "/campaigns",
    "/get-involved",
    "/volunteer",
    "/partner-with-ces",
    "/resources",
    "/gallery",
    "/events",
    "/updates",
    "/team",
    "/contact",
    "/privacy",
    "/terms",
    "/donation-policy",
    "/safeguarding-and-media-consent",
    "/accessibility",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/donate" ? 0.9 : 0.7,
  }));
}
