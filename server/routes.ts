import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for the MDM website
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactFormSchema.parse(req.body);
      const savedContact = await storage.createContactSubmission(contactData);
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: savedContact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: validationError.details
        });
      } else {
        console.error("Error processing contact form submission:", error);
        res.status(500).json({ 
          success: false, 
          message: "Error processing your request"
        });
      }
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const emailSchema = z.object({
        email: z.string().email({ message: "Invalid email address" })
      });
      
      const { email } = emailSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription({ email });
      
      res.status(201).json({ 
        success: true, 
        message: "Newsletter subscription successful",
        id: subscription.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Invalid email address",
          errors: validationError.details
        });
      } else {
        console.error("Error processing newsletter subscription:", error);
        res.status(500).json({ 
          success: false, 
          message: "Error processing your request"
        });
      }
    }
  });

  app.get("/api/resources", (req, res) => {
    // Simple endpoint to return resource categories
    res.json({
      success: true,
      categories: [
        { id: "blog", name: "Blog", count: 27 },
        { id: "case-studies", name: "Case Studies", count: 12 },
        { id: "whitepapers", name: "Whitepapers", count: 8 },
        { id: "guides", name: "Guides", count: 15 }
      ]
    });
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
