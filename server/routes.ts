import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { services, teamMembers, posts } from "@shared/schema";
import { db } from "./db";

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await db.insert(services).values([
      {
        title: {
          ka: "ფინანსური აუდიტი",
          en: "Financial Audit",
          ru: "Финансовый аудит"
        },
        slug: "financial-audit",
        description: {
          ka: "ჩვენი გუნდი უზრუნველყოფს ფინანსური ანგარიშგების სიზუსტესა და სანდოობას.",
          en: "Our team ensures the accuracy and reliability of financial statements.",
          ru: "Наша команда обеспечивает точность и надежность финансовой отчетности."
        },
        fullContent: {
          ka: "ჩვენ გთავაზობთ სრულ ფინანსურ აუდიტს საერთაშორისო სტანდარტების შესაბამისად...",
          en: "We offer a full financial audit in accordance with international standards...",
          ru: "Мы предлагаем полный финансовый аудит в соответствии с международными стандартами..."
        },
        icon: "Calculator"
      },
      {
        title: {
          ka: "საგადასახადო კონსულტაცია",
          en: "Tax Consulting",
          ru: "Налоговое консультирование"
        },
        slug: "tax-consulting",
        description: {
          ka: "საგადასახადო რისკების მართვა და ოპტიმიზაცია თქვენი ბიზნესისთვის.",
          en: "Tax risk management and optimization for your business.",
          ru: "Управление налоговыми рисками и оптимизация для вашего бизнеса."
        },
        fullContent: {
          ka: "ჩვენი საგადასახადო ექსპერტები დაგეხმარებიან საგადასახადო ვალდებულებების სწორად დაგეგმვაში...",
          en: "Our tax experts will help you properly plan your tax obligations...",
          ru: "Наши налоговые эксперты помогут вам правильно спланировать ваши налоговые обязательства..."
        },
        icon: "FileText"
      }
    ]);

    await db.insert(teamMembers).values([
      {
        name: {
          ka: "გიორგი ბერიძე",
          en: "Giorgi Beridze",
          ru: "Георгий Беридзе"
        },
        role: {
          ka: "მმართველი პარტნიორი",
          en: "Managing Partner",
          ru: "Управляющий партнер"
        },
        bio: {
          ka: "15 წლიანი გამოცდილება აუდიტსა და ფინანსურ მენეჯმენტში.",
          en: "15 years of experience in audit and financial management.",
          ru: "15 лет опыта в аудите и финансовом менеджменте."
        },
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
      }
    ]);

    await db.insert(posts).values([
      {
        title: {
          ka: "ახალი საგადასახადო რეგულაციები 2025",
          en: "New Tax Regulations 2025",
          ru: "Новые налоговые правила 2025"
        },
        slug: "new-tax-regulations-2025",
        summary: {
          ka: "მნიშვნელოვანი ცვლილებები მოგების გადასახადის კანონმდებლობაში.",
          en: "Significant changes in the profit tax legislation.",
          ru: "Существенные изменения в законодательстве о налоге на прибыль."
        },
        content: {
          ka: "2025 წლიდან ძალაში შედის ახალი საგადასახადო რეგულაციები...",
          en: "From 2025, new tax regulations will come into force...",
          ru: "С 2025 года вступят в силу новые налоговые правила..."
        },
        coverImageUrl: "https://images.unsplash.com/photo-1554224155-98406852d0aa?w=800&h=400&fit=crop"
      }
    ]);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  seedDatabase().catch(console.error);

  app.get(api.services.list.path, async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get(api.services.get.path, async (req, res) => {
    const service = await storage.getServiceBySlug(req.params.slug);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  });

  app.get(api.team.list.path, async (_req, res) => {
    const members = await storage.getTeamMembers();
    res.json(members);
  });

  app.get(api.posts.list.path, async (_req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const request = await storage.createContactRequest(input);
      res.status(201).json(request);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
