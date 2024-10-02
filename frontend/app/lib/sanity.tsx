import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "roz0w5ri",
  useCdn: false,
});

const builder = ImageUrlBuilder(client);

export function UrlFor(source: any) {
  return builder.image(source);
}
