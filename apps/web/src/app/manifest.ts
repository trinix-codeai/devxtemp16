import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LocalXplore",
    short_name: "LocalXplore",
    description: "White-label travel platform for local tourism businesses",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6ef",
    theme_color: "#0f766e",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
