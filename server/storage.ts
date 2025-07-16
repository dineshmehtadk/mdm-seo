import { 
  contactForms, 
  newsletterSubscriptions, 
  type ContactForm, 
  type InsertContactForm,
  type NewsletterSubscription,
  type InsertNewsletterSubscription
} from "@shared/schema";

// Interface defining all storage operations
export interface IStorage {
  // Contact form submissions
  getContactSubmission(id: number): Promise<ContactForm | undefined>;
  createContactSubmission(contact: InsertContactForm): Promise<ContactForm>;
  getContactSubmissions(): Promise<ContactForm[]>;
  
  // Newsletter subscriptions
  getNewsletterSubscription(id: number): Promise<NewsletterSubscription | undefined>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private contacts: Map<number, ContactForm>;
  private newsletters: Map<number, NewsletterSubscription>;
  private contactCurrentId: number;
  private newsletterCurrentId: number;

  constructor() {
    this.contacts = new Map();
    this.newsletters = new Map();
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;
  }

  // Contact form submissions
  async getContactSubmission(id: number): Promise<ContactForm | undefined> {
    return this.contacts.get(id);
  }

  async createContactSubmission(contact: InsertContactForm): Promise<ContactForm> {
    const id = this.contactCurrentId++;
    const timestamp = new Date();
    const newContact: ContactForm = { 
      ...contact, 
      id,
      createdAt: timestamp
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getContactSubmissions(): Promise<ContactForm[]> {
    return Array.from(this.contacts.values());
  }

  // Newsletter subscriptions
  async getNewsletterSubscription(id: number): Promise<NewsletterSubscription | undefined> {
    return this.newsletters.get(id);
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletters.values()).find(
      (subscription) => subscription.email === email
    );
  }

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if already exists
    const existing = await this.getNewsletterSubscriptionByEmail(subscription.email);
    if (existing) {
      return existing;
    }
    
    const id = this.newsletterCurrentId++;
    const timestamp = new Date();
    const newSubscription: NewsletterSubscription = { 
      ...subscription, 
      id,
      createdAt: timestamp
    };
    this.newsletters.set(id, newSubscription);
    return newSubscription;
  }
}

// Create and export a singleton instance
export const storage = new MemStorage();
