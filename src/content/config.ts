import { defineCollection, z } from "astro:content";

const talks = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.date(),
    location: z.string().optional(),
    cover: z.string().optional(),
    slides: z.string().optional(),
    video: z.string().optional(),
    description: z.string(),
  }),
});

const research = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const thoughts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    category: z.string(),
    externalUrl: z.string().url(),
    placement: z.enum(["lead", "side", "archive"]),
    order: z.number(),
    thumbClass: z.string().optional(),
  }),
});

export const collections = { talks, research, thoughts, projects };
