import { db } from "./db";
import {
  services,
  teamMembers,
  posts,
  contactRequests,
  type Service,
  type TeamMember,
  type Post,
  type ContactRequest,
  type InsertContactRequest
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  
  getTeamMembers(): Promise<TeamMember[]>;
  
  getPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    const allServices = await db.select().from(services);
    const order = [
      'audit-assurance',
      'financial-services',
      'loan-purpose-verification',
      'consulting',
      'legal-services',
      'property-valuation',
      'consulting-services',
      'tax-disputes-consulting',
      'blockchain-web3',
      'accounting-legislation',
    ];
    return allServices.sort((a, b) => {
      const ai = order.indexOf(a.slug);
      const bi = order.indexOf(b.slug);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }

  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts);
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    const [contact] = await db.insert(contactRequests).values(request).returning();
    return contact;
  }
}

export const storage = new DatabaseStorage();
