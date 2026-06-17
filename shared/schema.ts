import { pgTable, text, serial, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Multi-language structure
// { ka: "ტექსტი", en: "Text", ru: "Текст" }

// Services provided by the firm
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: jsonb("title").notNull(), // { ka, en, ru }
  description: jsonb("description").notNull(),
  fullContent: jsonb("full_content").notNull(),
  icon: text("icon").notNull(),
  slug: text("slug").notNull().unique(),
});

// Team members / Partners
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: jsonb("name").notNull(),
  role: jsonb("role").notNull(),
  bio: jsonb("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  email: text("email"),
  linkedinUrl: text("linkedin_url"),
});

// Insights / Blog posts
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: jsonb("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: jsonb("summary").notNull(),
  content: jsonb("content").notNull(),
  coverImageUrl: text("cover_image_url"),
  publishedAt: timestamp("published_at").defaultNow(),
});

// Contact form submissions
export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, publishedAt: true });
export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({ id: true, createdAt: true });

// Types
export type Service = typeof services.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type ContactRequest = typeof contactRequests.$inferSelect;

export type I18nString = {
  ka: string;
  en: string;
  ru: string;
};
