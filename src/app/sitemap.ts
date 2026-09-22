import type { MetadataRoute } from "next";
import { policies } from "@/data/policies";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/shop", priority: 0.9 },
    { path: "/custom-order", priority: 0.8 },
    { path: "/gallery", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/faq", priority: 0.5 },
  ].map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  const productRoutes = products.map((product) => ({
    url: `${site.url}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const policyRoutes = policies.map((policy) => ({
    url: `${site.url}/policies/${policy.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...productRoutes, ...policyRoutes];
}
