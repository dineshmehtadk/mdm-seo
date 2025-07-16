// server/index.ts
import express2 from "express";
import React7 from "react";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  contacts;
  newsletters;
  contactCurrentId;
  newsletterCurrentId;
  constructor() {
    this.contacts = /* @__PURE__ */ new Map();
    this.newsletters = /* @__PURE__ */ new Map();
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;
  }
  // Contact form submissions
  async getContactSubmission(id) {
    return this.contacts.get(id);
  }
  async createContactSubmission(contact) {
    const id = this.contactCurrentId++;
    const timestamp2 = /* @__PURE__ */ new Date();
    const newContact = {
      ...contact,
      id,
      createdAt: timestamp2
    };
    this.contacts.set(id, newContact);
    return newContact;
  }
  async getContactSubmissions() {
    return Array.from(this.contacts.values());
  }
  // Newsletter subscriptions
  async getNewsletterSubscription(id) {
    return this.newsletters.get(id);
  }
  async getNewsletterSubscriptionByEmail(email) {
    return Array.from(this.newsletters.values()).find(
      (subscription) => subscription.email === email
    );
  }
  async createNewsletterSubscription(subscription) {
    const existing = await this.getNewsletterSubscriptionByEmail(subscription.email);
    if (existing) {
      return existing;
    }
    const id = this.newsletterCurrentId++;
    const timestamp2 = /* @__PURE__ */ new Date();
    const newSubscription = {
      ...subscription,
      id,
      createdAt: timestamp2
    };
    this.newsletters.set(id, newSubscription);
    return newSubscription;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var contactForms = pgTable("contact_forms", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  privacyPolicy: boolean("privacy_policy").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy."
  })
});
var newsletterSubscriptionSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." })
});
var insertContactFormSchema = createInsertSchema(contactForms).omit({ id: true, createdAt: true });
var insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({ id: true, createdAt: true });

// server/routes.ts
import { z as z2 } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactFormSchema.parse(req.body);
      const savedContact = await storage.createContactSubmission(contactData);
      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        id: savedContact.id
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
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
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const emailSchema = z2.object({
        email: z2.string().email({ message: "Invalid email address" })
      });
      const { email } = emailSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription({ email });
      res.status(201).json({
        success: true,
        message: "Newsletter subscription successful",
        id: subscription.id
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
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
  app2.get("/api/resources", (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    hmr: { overlay: true },
    host: "0.0.0.0",
    port: 5e3
    // optional, choose a port
  },
  ssr: {
    noExternal: ["your-ui-lib-if-needed"],
    external: [],
    // Mock asset types that should not be bundled on the server
    target: "node"
  },
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg"]
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import fs2 from "fs";
import path3 from "path";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

// client/src/App.tsx
import { Routes, Route } from "react-router";

// client/src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";
async function throwIfResNotOk(res) {
  if (!res.ok) {
    const text2 = await res.text() || res.statusText;
    throw new Error(`${res.status}: ${text2}`);
  }
}
var getQueryFn = ({ on401: unauthorizedBehavior }) => async ({ queryKey }) => {
  const res = await fetch(queryKey[0], {
    credentials: "include"
  });
  if (unauthorizedBehavior === "returnNull" && res.status === 401) {
    return null;
  }
  await throwIfResNotOk(res);
  return await res.json();
};
var queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false
    },
    mutations: {
      retry: false
    }
  }
});

// client/src/App.tsx
import { QueryClientProvider } from "@tanstack/react-query";

// client/src/hooks/use-toast.ts
import * as React from "react";
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

// client/src/components/ui/toast.tsx
import * as React2 from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

// client/src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// client/src/components/ui/toast.tsx
import { jsx } from "react/jsx-runtime";
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = React2.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// client/src/components/ui/toaster.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx2(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx2(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx2(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx2(ToastViewport, {})
  ] });
}

// client/src/components/ui/card.tsx
import * as React3 from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Card = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
var CardHeader = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

// client/src/pages/not-found.tsx
import { AlertCircle } from "lucide-react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function NotFound() {
  return /* @__PURE__ */ jsx4("div", { className: "min-h-screen w-full flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx4(Card, { className: "w-full max-w-md mx-4", children: /* @__PURE__ */ jsxs2(CardContent, { className: "pt-6", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex mb-4 gap-2", children: [
      /* @__PURE__ */ jsx4(AlertCircle, { className: "h-8 w-8 text-red-500" }),
      /* @__PURE__ */ jsx4("h1", { className: "text-2xl font-bold text-gray-900", children: "404 Page Not Found" })
    ] }),
    /* @__PURE__ */ jsx4("p", { className: "mt-4 text-sm text-gray-600", children: "Did you forget to add the page to the router?" })
  ] }) }) });
}

// client/src/components/layout/Header.tsx
import { useState as useState2 } from "react";
import { Link, useLocation } from "wouter";

// client/src/components/ui/button.tsx
import * as React4 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx5 } from "react/jsx-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:scale-95",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React4.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx5(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// client/src/components/ui/sheet.tsx
import * as React5 from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva as cva3 } from "class-variance-authority";
import { X as X2 } from "lucide-react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx6(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva3(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContent = React5.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs3(SheetPortal, { children: [
  /* @__PURE__ */ jsx6(SheetOverlay, {}),
  /* @__PURE__ */ jsxs3(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs3(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx6(X2, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx6("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx6(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx6(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx6(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx6(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// client/src/components/ui/dropdown-menu.tsx
import * as React6 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React6.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs4(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx7(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React6.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx7(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React6.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React6.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs4(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx7("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx7(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx7(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React6.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs4(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx7("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx7(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx7(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React6.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx7(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx7(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// client/src/components/layout/Header.tsx
import { Menu, ChevronDown } from "lucide-react";
import { navigate } from "wouter/use-browser-location";
import { Fragment, jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var Header = () => {
  const [location] = useLocation();
  return /* @__PURE__ */ jsx8("header", { className: "sticky top-0 z-50 bg-white shadow-md", children: /* @__PURE__ */ jsx8("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-center py-4", children: [
    /* @__PURE__ */ jsx8("div", { className: "flex items-center", children: /* @__PURE__ */ jsx8(Link, { href: "/", className: "flex items-center" }) }),
    /* @__PURE__ */ jsx8("nav", { className: "hidden md:flex space-x-8", children: /* @__PURE__ */ jsx8(DesktopNavigation, { currentPath: location }) }),
    /* @__PURE__ */ jsxs5("div", { className: "hidden md:flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx8(Button, { variant: "ghost", className: "font-medium", children: "Sign In" }),
      /* @__PURE__ */ jsx8("a", { href: "https://calendly.com/mobiheal-demo/booking", target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx8(Button, { className: "font-medium", children: "Request Demo" }) })
    ] }),
    /* @__PURE__ */ jsx8(MobileNavigation, { currentPath: location })
  ] }) }) });
};
var DesktopNavigation = ({ currentPath }) => {
  return /* @__PURE__ */ jsxs5(Fragment, { children: [
    /* @__PURE__ */ jsxs5(DropdownMenu, { children: [
      /* @__PURE__ */ jsxs5(DropdownMenuTrigger, { className: "flex items-center space-x-1 text-neutral-700 hover:text-primary bg-transparent border-0 cursor-pointer", children: [
        /* @__PURE__ */ jsx8("span", { children: "Features" }),
        /* @__PURE__ */ jsx8(ChevronDown, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsxs5(DropdownMenuContent, { children: [
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/features#data-encryption"), children: "Data Encryption" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/features#work-profile"), children: "Work Profile Container" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/features#remote-lock"), children: "Remote Lock & Wipe" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/features#app-management"), children: "App Management" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/features"), children: "View All Features" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5(DropdownMenu, { children: [
      /* @__PURE__ */ jsxs5(DropdownMenuTrigger, { className: "flex items-center space-x-1 text-neutral-700 hover:text-primary bg-transparent border-0 cursor-pointer", children: [
        /* @__PURE__ */ jsx8("span", { children: "Use Cases" }),
        /* @__PURE__ */ jsx8(ChevronDown, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsxs5(DropdownMenuContent, { children: [
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/use-cases#kiosk"), children: "Kiosk Mode Management" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/use-cases#corporate"), children: "Corporate-Owned Devices" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/use-cases#byod"), children: "BYOD Management" })
      ] })
    ] }),
    /* @__PURE__ */ jsx8(
      Link,
      {
        href: "/pricing",
        className: `text-neutral-700 hover:text-primary ${currentPath === "/pricing" ? "text-primary" : ""}`,
        children: "Pricing"
      }
    ),
    /* @__PURE__ */ jsxs5(DropdownMenu, { children: [
      /* @__PURE__ */ jsxs5(DropdownMenuTrigger, { className: "flex items-center space-x-1 text-neutral-700 hover:text-primary bg-transparent border-0 cursor-pointer", children: [
        /* @__PURE__ */ jsx8("span", { children: "Resources" }),
        /* @__PURE__ */ jsx8(ChevronDown, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsxs5(DropdownMenuContent, { children: [
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/blog"), children: "Blog" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/case-studies"), children: "Case Studies" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/whitepapers"), children: "Whitepapers" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/owasp-mobile"), children: "OWASP Mobile Top 10" })
      ] })
    ] }),
    /* @__PURE__ */ jsx8(
      Link,
      {
        href: "/faq",
        className: `text-neutral-700 hover:text-primary ${currentPath === "/faq" ? "text-primary" : ""}`,
        children: "FAQs"
      }
    ),
    /* @__PURE__ */ jsxs5(DropdownMenu, { children: [
      /* @__PURE__ */ jsxs5(DropdownMenuTrigger, { className: "flex items-center space-x-1 text-neutral-700 hover:text-primary bg-transparent border-0 cursor-pointer", children: [
        /* @__PURE__ */ jsx8("span", { children: "Partners" }),
        /* @__PURE__ */ jsx8(ChevronDown, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsxs5(DropdownMenuContent, { children: [
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/partners"), children: "Partners & Clients" }),
        /* @__PURE__ */ jsx8(DropdownMenuItem, { onSelect: () => navigate("/testimonials"), children: "Testimonials" })
      ] })
    ] }),
    /* @__PURE__ */ jsx8(
      Link,
      {
        href: "/contact",
        className: `text-neutral-700 hover:text-primary ${currentPath === "/contact" ? "text-primary" : ""}`,
        children: "Contact"
      }
    )
  ] });
};
var MobileNavigation = ({ currentPath }) => {
  const [, navigate2] = useLocation();
  const [open, setOpen] = useState2(false);
  const handleNavigate = (path4) => {
    navigate2(path4);
    setOpen(false);
  };
  return /* @__PURE__ */ jsx8("div", { className: "md:hidden", children: /* @__PURE__ */ jsxs5(Sheet, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx8(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs5(Button, { variant: "ghost", size: "icon", children: [
      /* @__PURE__ */ jsx8(Menu, { className: "h-6 w-6" }),
      /* @__PURE__ */ jsx8("span", { className: "sr-only", children: "Open menu" })
    ] }) }),
    /* @__PURE__ */ jsx8(SheetContent, { side: "right", className: "w-[300px] sm:w-[400px]", children: /* @__PURE__ */ jsxs5("nav", { className: "flex flex-col gap-4 mt-6", children: [
      /* @__PURE__ */ jsx8("button", { onClick: () => handleNavigate("/"), className: `text-left py-2 hover:text-primary ${currentPath.includes("/") ? "text-primary" : ""}`, children: "Home" }),
      /* @__PURE__ */ jsx8("button", { onClick: () => handleNavigate("/features"), className: `text-left py-2 hover:text-primary ${currentPath.includes("/features") ? "text-primary" : ""}`, children: "Features" }),
      /* @__PURE__ */ jsx8("button", { onClick: () => handleNavigate("/use-cases"), className: `text-left py-2 hover:text-primary ${currentPath.includes("/use-cases") ? "text-primary" : ""}`, children: "Use Cases" }),
      /* @__PURE__ */ jsx8("button", { onClick: () => handleNavigate("/pricing"), className: `text-left py-2 hover:text-primary ${currentPath === "/pricing" ? "text-primary" : ""}`, children: "Pricing" }),
      /* @__PURE__ */ jsx8("button", { onClick: () => handleNavigate("/resources"), className: `text-left py-2 hover:text-primary ${currentPath.includes("/resources") ? "text-primary" : ""}`, children: "Resources" }),
      /* @__PURE__ */ jsx8("button", { onClick: () => handleNavigate("/faq"), className: `text-left py-2 hover:text-primary ${currentPath === "/faq" ? "text-primary" : ""}`, children: "FAQs" }),
      /* @__PURE__ */ jsx8("button", { onClick: () => handleNavigate("/partners"), className: `text-left py-2 hover:text-primary ${currentPath.includes("/partners") ? "text-primary" : ""}`, children: "Partners" }),
      /* @__PURE__ */ jsx8("button", { onClick: () => handleNavigate("/contact"), className: `text-left py-2 hover:text-primary ${currentPath === "/contact" ? "text-primary" : ""}`, children: "Contact" }),
      /* @__PURE__ */ jsxs5("div", { className: "flex flex-col gap-3 mt-4", children: [
        /* @__PURE__ */ jsx8(Button, { variant: "outline", className: "w-full", children: "Sign In" }),
        /* @__PURE__ */ jsx8(Button, { className: "w-full", children: "Request Demo" })
      ] })
    ] }) })
  ] }) });
};
var Header_default = Header;

// client/src/components/layout/Footer.tsx
import { Link as Link2 } from "wouter";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var Footer = () => {
  return /* @__PURE__ */ jsx9("footer", { className: "bg-neutral-800 text-neutral-300 pt-16 pb-8", children: /* @__PURE__ */ jsxs6("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs6("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-12", children: [
      /* @__PURE__ */ jsxs6("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsx9("div", { className: "flex items-center mb-4" }),
        /* @__PURE__ */ jsx9("p", { className: "mb-6", children: "Mobisec Technologies Pvt. Ltd. is a mobile security company offering products and services for securing mobile computing devices such as smartphones and tablets to help enterprises." }),
        /* @__PURE__ */ jsxs6("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsx9(
            "a",
            {
              href: "https://www.linkedin.com/company/mobisecin",
              className: "text-neutral-400 hover:text-white text-xl",
              children: /* @__PURE__ */ jsxs6(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "w-5 h-5",
                  children: [
                    /* @__PURE__ */ jsx9("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
                    /* @__PURE__ */ jsx9("rect", { width: "4", height: "12", x: "2", y: "9" }),
                    /* @__PURE__ */ jsx9("circle", { cx: "4", cy: "4", r: "2" })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx9(
            "a",
            {
              href: "https://www.twitter.com/mobisec_/",
              className: "text-neutral-400 hover:text-white text-xl",
              children: /* @__PURE__ */ jsx9(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "w-5 h-5",
                  children: /* @__PURE__ */ jsx9("path", { d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx9(
            "a",
            {
              href: "https://www.facebook.com/mobisec.in",
              className: "text-neutral-400 hover:text-white text-xl",
              children: /* @__PURE__ */ jsx9(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "w-5 h-5",
                  children: /* @__PURE__ */ jsx9("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx9(
            "a",
            {
              href: "https://www.youtube.com/@mobisec4594",
              className: "text-neutral-400 hover:text-white text-xl",
              children: /* @__PURE__ */ jsxs6(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "w-5 h-5",
                  children: [
                    /* @__PURE__ */ jsx9("path", { d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" }),
                    /* @__PURE__ */ jsx9("path", { d: "m10 15 5-3-5-3z" })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx9(
            "a",
            {
              href: "https://www.instagram.com/mobisec_",
              children: /* @__PURE__ */ jsxs6(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "w-5 h-5 text-neutral-400 hover:text-white",
                  children: [
                    /* @__PURE__ */ jsx9("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }),
                    /* @__PURE__ */ jsx9("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
                    /* @__PURE__ */ jsx9("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
                  ]
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx9("h4", { className: "text-white font-semibold text-lg mb-4", children: "Solutions" }),
        /* @__PURE__ */ jsxs6("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(
            Link2,
            {
              href: "/features#data-encryption",
              className: "hover:text-white",
              children: "Data Encryption"
            }
          ) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(
            Link2,
            {
              href: "/features#work-profile",
              className: "hover:text-white",
              children: "Work Profile Container"
            }
          ) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(
            Link2,
            {
              href: "/features#remote-management",
              className: "hover:text-white",
              children: "Remote Management"
            }
          ) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(Link2, { href: "/features#kiosk-mode", className: "hover:text-white", children: "Kiosk Mode" }) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(
            Link2,
            {
              href: "/features#app-management",
              className: "hover:text-white",
              children: "App Management"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx9("h4", { className: "text-white font-semibold text-lg mb-4", children: "Company" }),
        /* @__PURE__ */ jsxs6("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(Link2, { href: "/about-us", className: "hover:text-white", children: "About Us" }) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9("a", { href: "#", className: "hover:text-white", children: "Careers" }) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(Link2, { href: "/partners", className: "hover:text-white", children: "Partners" }) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9("a", { href: "#", className: "hover:text-white", children: "Press & Media" }) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(Link2, { href: "/contact", className: "hover:text-white", children: "Contact Us" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx9("h4", { className: "text-white font-semibold text-lg mb-4", children: "Resources" }),
        /* @__PURE__ */ jsxs6("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(Link2, { href: "/blog", className: "hover:text-white", children: "Blog" }) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(Link2, { href: "/case-studies", className: "hover:text-white", children: "Case Studies" }) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(Link2, { href: "/whitepapers", className: "hover:text-white", children: "Whitepapers" }) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(Link2, { href: "/owasp-mobile", className: "hover:text-white", children: "OWASP Mobile Top 10" }) }),
          /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(Link2, { href: "/faq", className: "hover:text-white", children: "FAQs" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx9("hr", { className: "border-neutral-700 my-8" }),
    /* @__PURE__ */ jsxs6("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsx9("div", { className: "mb-4 md:mb-0", children: /* @__PURE__ */ jsxs6("p", { children: [
        "\xA9 ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        "  Mobisec, Inc. All rights reserved."
      ] }) }),
      /* @__PURE__ */ jsxs6("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsx9(Link2, { to: "/privacy-policy", className: "hover:text-white", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx9(Link2, { href: "terms-services", className: "hover:text-white", children: "Terms of Service" }),
        /* @__PURE__ */ jsx9(Link2, { href: "/cookies-policy", className: "hover:text-white", children: "Cookie Policy" }),
        /* @__PURE__ */ jsx9("a", { href: "/acceptable-policy", className: "hover:text-white", children: "Acceptable Use Policy" })
      ] })
    ] })
  ] }) });
};
var Footer_default = Footer;

// client/src/components/layout/Layout.tsx
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var Layout = ({ children }) => {
  return /* @__PURE__ */ jsxs7("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx10(Header_default, {}),
    /* @__PURE__ */ jsx10("main", { className: "flex-grow", children }),
    /* @__PURE__ */ jsx10(Footer_default, {})
  ] });
};
var Layout_default = Layout;

// client/src/pages/Home.tsx
import { Fragment as Fragment2, jsx as jsx11 } from "react/jsx-runtime";
var Home = () => {
  return /* @__PURE__ */ jsx11(Fragment2, {});
};
var Home_default = Home;

// client/src/pages/TermsOfService.tsx
import { Helmet } from "react-helmet";
import { Fragment as Fragment3, jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
var TermsOfService = () => {
  return /* @__PURE__ */ jsxs8(Fragment3, { children: [
    "  ",
    /* @__PURE__ */ jsxs8(Helmet, { children: [
      /* @__PURE__ */ jsx12("title", { children: "Terms of Service | Mobisec Technologies Pvt. Ltd" }),
      /* @__PURE__ */ jsx12("meta", { name: "description", content: "Read the legal terms and policies of Mobisec Technologies Pvt. Ltd including our privacy policy, user responsibilities, and service terms." }),
      /* @__PURE__ */ jsx12("meta", { name: "keywords", content: "terms of service, privacy policy, Mobisec Technologies, legal terms, conditions" }),
      /* @__PURE__ */ jsx12("meta", { name: "author", content: "Mobisec Technologies Pvt. Ltd " })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 font-sans min-h-screen py-16 px-4 sm:px-8 md:px-12 lg:px-20 max-w-6xl mx-auto shadow-lg rounded-xl my-8", children: [
      /* @__PURE__ */ jsx12("style", { children: `
        .text-primary {
          color: #03a9fc; /* Your primary color */
        }
        .text-secondary {
          color: #0285c7; /* Your secondary color */
        }
        .border-primary-light {
          border-color: rgba(3, 169, 252, 0.3); /* Lighter primary for borders */
        }
        .text-blue-600 {
          color: #03a9fc; /* Overriding Tailwind's default blue for links to your primary */
        }
        .hover:text-blue-800:hover {
          color: #0285c7; /* Overriding Tailwind's default blue hover for links to your secondary */
        }
      ` }),
      /* @__PURE__ */ jsxs8("header", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx12("h1", { className: "text-5xl font-extrabold text-primary mb-4 tracking-tight", children: "Terms of Service" }),
        /* @__PURE__ */ jsxs8("p", { className: "text-md text-gray-600", children: [
          "Last updated: ",
          /* @__PURE__ */ jsx12("span", { className: "font-semibold", children: "November 14, 2023" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("article", { className: "space-y-10 leading-relaxed text-lg text-gray-700", children: [
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Agreement to Our Legal Terms" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: 'We are **Mobisec Technologies Pvt. Ltd** ("Company," "we," "us," "our"), a company registered in India at F-200, FF, Phase-1, New Palam Vihar, Sec-110, Gurugram, Haryana 122017.' }),
          /* @__PURE__ */ jsxs8("p", { className: "mb-4", children: [
            "We operate the website ",
            /* @__PURE__ */ jsx12("a", { href: "https://mobiheal.in", className: "text-blue-600 hover:text-blue-800 underline transition-colors duration-200", children: "https://mobiheal.in" }),
            ' (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").'
          ] }),
          /* @__PURE__ */ jsxs8("p", { className: "mb-4", children: [
            "You can contact us by phone at +91-11-6926-8029, email at ",
            /* @__PURE__ */ jsx12("a", { href: "mailto:contact@mobisec.in", className: "text-blue-600 hover:text-blue-800 underline transition-colors duration-200", children: "contact@mobisec.in" }),
            ", or by mail to F-200, FF, Phase-1, New Palam Vihar, Sec-110, Gurugram, Haryana 122017, India."
          ] }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: 'These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and **Mobisec Technologies Pvt. Ltd**, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. **If you do not agree with all of these legal terms, then you are expressly prohibited from using the services and you must discontinue use immediately.** Users will be notified of any changes to our Legal Terms through our website.' }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services." }),
          /* @__PURE__ */ jsx12("p", { children: "We recommend that you print a copy of these Legal Terms for your records." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Table of Contents" }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-2 pl-4", children: [
            /* @__PURE__ */ jsx12("li", { children: "Our Services" }),
            /* @__PURE__ */ jsx12("li", { children: "Intellectual Property Rights" }),
            /* @__PURE__ */ jsx12("li", { children: "User Representations" }),
            /* @__PURE__ */ jsx12("li", { children: "User Registration" }),
            /* @__PURE__ */ jsx12("li", { children: "Purchases and Payment" }),
            /* @__PURE__ */ jsx12("li", { children: "Free Trial" }),
            /* @__PURE__ */ jsx12("li", { children: "Cancellation" }),
            /* @__PURE__ */ jsx12("li", { children: "Prohibited Activities" }),
            /* @__PURE__ */ jsx12("li", { children: "User Generated Contributions" }),
            /* @__PURE__ */ jsx12("li", { children: "Contribution License" }),
            /* @__PURE__ */ jsx12("li", { children: "Services Management" }),
            /* @__PURE__ */ jsx12("li", { children: "Privacy Policy" }),
            /* @__PURE__ */ jsx12("li", { children: "Term and Termination" }),
            /* @__PURE__ */ jsx12("li", { children: "Modifications and Interruptions" }),
            /* @__PURE__ */ jsx12("li", { children: "Governing Law" }),
            /* @__PURE__ */ jsx12("li", { children: "Dispute Resolution" }),
            /* @__PURE__ */ jsx12("li", { children: "Corrections" }),
            /* @__PURE__ */ jsx12("li", { children: "Disclaimer" }),
            /* @__PURE__ */ jsx12("li", { children: "Limitations of Liability" }),
            /* @__PURE__ */ jsx12("li", { children: "Indemnification" }),
            /* @__PURE__ */ jsx12("li", { children: "User Data" }),
            /* @__PURE__ */ jsx12("li", { children: "Electronic Communications, Transactions, and Signatures" }),
            /* @__PURE__ */ jsx12("li", { children: "Miscellaneous" }),
            /* @__PURE__ */ jsx12("li", { children: "Contact Us" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Our Services" }),
          /* @__PURE__ */ jsx12("p", { children: "The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Intellectual Property Rights" }),
          /* @__PURE__ */ jsx12("h3", { className: "text-2xl font-semibold text-secondary mb-3", children: "Our intellectual property" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: 'We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").' }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world." }),
          /* @__PURE__ */ jsx12("p", { children: 'The Content and Marks are provided in or through the Services "AS IS" for your internal business purpose only.' }),
          /* @__PURE__ */ jsx12("h3", { className: "text-2xl font-semibold text-secondary mt-6 mb-3", children: "Your use of our Services" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: 'Subject to your compliance with these Legal Terms, including the **"PROHIBITED ACTIVITIES"** section below, we grant you a non-exclusive, non-transferable, revocable license to:' }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-2 pl-4 mb-4", children: [
            /* @__PURE__ */ jsx12("li", { children: "Access the Services; and" }),
            /* @__PURE__ */ jsx12("li", { children: "Download or print a copy of any portion of the content to which you have properly gained access solely for your internal business purpose." })
          ] }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission." }),
          /* @__PURE__ */ jsxs8("p", { className: "mb-4", children: [
            "If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: ",
            /* @__PURE__ */ jsx12("a", { href: "mailto:contact@mobisec.in", className: "text-blue-600 hover:text-blue-800 underline transition-colors duration-200", children: "contact@mobisec.in" }),
            ". If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content."
          ] }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "We reserve all rights not expressly granted to you in and to the Services, Content, and Marks." }),
          /* @__PURE__ */ jsx12("p", { children: "Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately." }),
          /* @__PURE__ */ jsx12("h3", { className: "text-2xl font-semibold text-secondary mt-6 mb-3", children: "Your submissions" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: 'Please review this section and the **"PROHIBITED ACTIVITIES"** section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.' }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: '**Submissions:** By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.' }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "**You are responsible for what you post or upload:** By sending us submissions through any part of the Services you:" }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-2 pl-4 mb-4", children: [
            /* @__PURE__ */ jsx12("li", { children: 'confirm that you have read and agree with our **"PROHIBITED ACTIVITIES"** and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;' }),
            /* @__PURE__ */ jsx12("li", { children: "to the extent permissible by applicable law, waive any and all moral rights to any such Submission;" }),
            /* @__PURE__ */ jsx12("li", { children: "warrant that any such Submission are original to you or that you have the necessary rights and licenses to submit such submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and" }),
            /* @__PURE__ */ jsx12("li", { children: "warrant and represent that your Submissions do not constitute confidential information." })
          ] }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party's intellectual property rights, or (c) applicable law." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "User Representations" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "By using the Services, you represent and warrant that:" }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-2 pl-4 mb-4", children: [
            /* @__PURE__ */ jsx12("li", { children: "all registration information you submit will be true, accurate, current, and complete;" }),
            /* @__PURE__ */ jsx12("li", { children: "you will maintain the accuracy of such information and promptly update such registration information as necessary;" }),
            /* @__PURE__ */ jsx12("li", { children: "you have the legal capacity and you agree to comply with these Legal Terms;" }),
            /* @__PURE__ */ jsx12("li", { children: "you are not a minor in the jurisdiction in which you reside;" }),
            /* @__PURE__ */ jsx12("li", { children: "you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;" }),
            /* @__PURE__ */ jsx12("li", { children: "you will not use the Services for any illegal or unauthorized purpose; and" }),
            /* @__PURE__ */ jsx12("li", { children: "your use of the Services will not violate any applicable law or regulation." })
          ] }),
          /* @__PURE__ */ jsx12("p", { children: "If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof)." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "User Registration" }),
          /* @__PURE__ */ jsx12("p", { children: "You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Purchases and Payment" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "We accept the following forms of payment:" }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-1 pl-4 mb-4", children: [
            /* @__PURE__ */ jsx12("li", { children: "Visa" }),
            /* @__PURE__ */ jsx12("li", { children: "Mastercard" })
          ] }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in INR." }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment." }),
          /* @__PURE__ */ jsx12("p", { children: "We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Free Trial" }),
          /* @__PURE__ */ jsx12("p", { children: "We offer a 14-day free trial to new users who register with the Services. The account will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Cancellation" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "All purchases are non-refundable. You can cancel your subscription at any time by contacting us using the contact information provided below. Your cancellation will take effect at the end of the current paid term." }),
          /* @__PURE__ */ jsxs8("p", { children: [
            "If you are unsatisfied with our Services, please email us at ",
            /* @__PURE__ */ jsx12("a", { href: "mailto:contact@mobisec.in", className: "text-blue-600 hover:text-blue-800 underline transition-colors duration-200", children: "contact@mobisec.in" }),
            " or call us at ",
            /* @__PURE__ */ jsx12("a", { href: "tel:+91-11-6926-8029", className: "text-blue-600 hover:text-blue-800 underline transition-colors duration-200", children: "+91-11-6926-8029" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Prohibited Activities" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us." }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "As a user of the Services, you agree not to:" }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-2 pl-4", children: [
            /* @__PURE__ */ jsx12("li", { children: "Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us." }),
            /* @__PURE__ */ jsx12("li", { children: "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords." }),
            /* @__PURE__ */ jsx12("li", { children: "Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein." }),
            /* @__PURE__ */ jsx12("li", { children: "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services." }),
            /* @__PURE__ */ jsx12("li", { children: "Use any information obtained from the Services in order to harass, abuse, or harm another person." }),
            /* @__PURE__ */ jsx12("li", { children: "Make improper use of our support services or submit false reports of abuse or misconduct." }),
            /* @__PURE__ */ jsx12("li", { children: "Use the Services in a manner inconsistent with any applicable laws or regulations." }),
            /* @__PURE__ */ jsx12("li", { children: "Engage in unauthorized framing of or linking to the Services." }),
            /* @__PURE__ */ jsx12("li", { children: "Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services." }),
            /* @__PURE__ */ jsx12("li", { children: "Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools." }),
            /* @__PURE__ */ jsx12("li", { children: "Delete the copyright or other proprietary rights notice from any Content." }),
            /* @__PURE__ */ jsx12("li", { children: "Attempt to impersonate another user or person or use the username of another user." }),
            /* @__PURE__ */ jsx12("li", { children: 'Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1x1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").' }),
            /* @__PURE__ */ jsx12("li", { children: "Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services." }),
            /* @__PURE__ */ jsx12("li", { children: "Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you." }),
            /* @__PURE__ */ jsx12("li", { children: "Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services." }),
            /* @__PURE__ */ jsx12("li", { children: "Copy or adapt the Services software, including but not limited to Flash, PHP, HTML, JavaScript, or other code." }),
            /* @__PURE__ */ jsx12("li", { children: "Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services." }),
            /* @__PURE__ */ jsx12("li", { children: "Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software." }),
            /* @__PURE__ */ jsx12("li", { children: "Use a buying agent or purchasing agent to make purchases on the Services." }),
            /* @__PURE__ */ jsx12("li", { children: "Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses." }),
            /* @__PURE__ */ jsx12("li", { children: "Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise." }),
            /* @__PURE__ */ jsx12("li", { children: "Use the Services to advertise or offer to sell goods and services." }),
            /* @__PURE__ */ jsx12("li", { children: "Sell or otherwise transfer your profile." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "User Generated Contributions" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: `The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated in accordance with the Services' Privacy Policy. When you create or make available any Contributions, you thereby represent and warrant that:` }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-2 pl-4", children: [
            /* @__PURE__ */ jsx12("li", { children: "The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party." }),
            /* @__PURE__ */ jsx12("li", { children: "You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms." }),
            /* @__PURE__ */ jsx12("li", { children: "You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions are not false, inaccurate, or misleading." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us)." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions do not violate any applicable law, regulation, or rule." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions do not violate the privacy or publicity rights of any third party." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap." }),
            /* @__PURE__ */ jsx12("li", { children: "Your Contributions do not violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation." })
          ] }),
          /* @__PURE__ */ jsx12("p", { className: "mt-4", children: "Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Contribution License" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "You and Services agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings). By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you." }),
          /* @__PURE__ */ jsx12("p", { children: "We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Services Management" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "We reserve the right, but not the obligation, to:" }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-2 pl-4", children: [
            /* @__PURE__ */ jsx12("li", { children: "monitor the Services for violations of these Legal Terms;" }),
            /* @__PURE__ */ jsx12("li", { children: "take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities;" }),
            /* @__PURE__ */ jsx12("li", { children: "in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof;" }),
            /* @__PURE__ */ jsx12("li", { children: "in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and" }),
            /* @__PURE__ */ jsx12("li", { children: "otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Privacy Policy" }),
          /* @__PURE__ */ jsxs8("p", { className: "mb-4", children: [
            "We care about data privacy and security. Please review our Privacy Policy: ",
            /* @__PURE__ */ jsx12("a", { href: "https://mobiheal.in/privacy_policy/", target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:text-blue-800 underline transition-colors duration-200", children: "https://mobiheal.in/privacy_policy/" }),
            " By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in India."
          ] }),
          /* @__PURE__ */ jsx12("p", { children: "If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in India, then through your continued use of the Services, you are transferring your data to India, and you expressly consent to have your data transferred to and processed in India." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Term and Termination" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "These Legal Terms shall remain in full force and effect while you use the Services. Without limiting any other provision of these legal terms, we reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the services (including blocking certain IP addresses), to any person for any reason or for no reason, including without limitation for breach of any representation, warranty, or covenant contained in these legal terms or of any applicable law or regulation. We may terminate your use or participation in the services or delete your account and any content or information that you posted at any time, without warning, at our sole discretion." }),
          /* @__PURE__ */ jsx12("p", { children: "If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Modifications and Interruptions" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services." }),
          /* @__PURE__ */ jsx12("p", { children: "We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Governing Law" }),
          /* @__PURE__ */ jsx12("p", { children: "These Legal Terms shall be governed by and defined following the laws of India. **Mobisec Technologies Pvt. Ltd** and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Dispute Resolution" }),
          /* @__PURE__ */ jsx12("p", { children: "You agree to irrevocably submit all disputes related to these Legal Terms or the legal relationship established by these Legal Terms to the jurisdiction of the India courts. **Mobisec Technologies Pvt. Ltd** shall also maintain the right to bring proceedings as to the substance of the matter in the courts of the country where you reside or, if these Legal Terms are entered into in the course of your trade or profession, the state of your principal place of business." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Corrections" }),
          /* @__PURE__ */ jsx12("p", { children: "There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Disclaimer" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "The services are provided on an as-is and as-available basis. You agree that your use of the services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the services and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no warranties or representations about the accuracy or completeness of the services' content or the content of any websites or mobile applications linked to the services and we will assume no liability or responsibility for any:" }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-2 pl-4 mb-4", children: [
            /* @__PURE__ */ jsx12("li", { children: "errors, mistakes, or inaccuracies of content and materials," }),
            /* @__PURE__ */ jsx12("li", { children: "personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the services," }),
            /* @__PURE__ */ jsx12("li", { children: "any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein," }),
            /* @__PURE__ */ jsx12("li", { children: "any interruption or cessation of transmission to or from the services," }),
            /* @__PURE__ */ jsx12("li", { children: "any bugs, viruses, trojan horses, or the like which may be transmitted to or through the services by any third party, and/or" }),
            /* @__PURE__ */ jsx12("li", { children: "any errors or omissions in any content and materials or for any loss or damage of any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via the services." })
          ] }),
          /* @__PURE__ */ jsx12("p", { children: "We do not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the services, any hyperlinked website, or any website or mobile application featured in any banner or other advertising, and we will not be a party to or in any way be responsible for monitoring any transaction between you and any third-party providers of products or services. As with the purchase of a product or service through any medium or in any environment, you should use your best judgment and exercise caution where appropriate." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Limitations of Liability" }),
          /* @__PURE__ */ jsx12("p", { children: "In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the services, even if we have been advised of the possibility of such damages. Notwithstanding anything to the contrary contained herein, our liability to you for any cause whatsoever and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us during the six (6) month period prior to any cause of action arising. Certain state laws and international laws do not allow limitations on implied warranties or the exclusion or limitation of certain damages. if these laws apply to you, some or all of the above disclaimers or limitations may not apply to you, and you may have additional rights." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Indemnification" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of:" }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside space-y-2 pl-4 mb-4", children: [
            /* @__PURE__ */ jsx12("li", { children: "use of the Services;" }),
            /* @__PURE__ */ jsx12("li", { children: "breach of these Legal Terms;" }),
            /* @__PURE__ */ jsx12("li", { children: "any breach of your representations and warranties set forth in these Legal Terms;" }),
            /* @__PURE__ */ jsx12("li", { children: "your violation of the rights of a third party, including but not limited to intellectual property rights; or" }),
            /* @__PURE__ */ jsx12("li", { children: "any overt harmful act toward any other user of the Services with whom you connected via the Services." })
          ] }),
          /* @__PURE__ */ jsx12("p", { children: "Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "User Data" }),
          /* @__PURE__ */ jsx12("p", { children: "We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Electronic Communications, Transactions, And Signatures" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. **You hereby agree to the use of electronic signatures, contracts, orders, and other records, and to electronic delivery of notices, policies, and records of transactions initiated or completed by us or via the services.** You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Miscellaneous" }),
          /* @__PURE__ */ jsx12("p", { children: "These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms." })
        ] }),
        /* @__PURE__ */ jsxs8("section", { className: "p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx12("h2", { className: "text-3xl font-bold text-secondary mb-6 border-b-2 border-primary-light pb-2", children: "Contact Us" }),
          /* @__PURE__ */ jsx12("p", { className: "mb-4", children: "In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:" }),
          /* @__PURE__ */ jsxs8("address", { className: "not-italic mb-4 pl-4", children: [
            /* @__PURE__ */ jsx12("p", { children: "Mobisec Technologies Pvt. Ltd" }),
            /* @__PURE__ */ jsx12("p", { children: "F-200, FF, Phase-1, New Palam Vihar, Sec-110" }),
            /* @__PURE__ */ jsx12("p", { children: "Gurugram, Haryana 122017 India" })
          ] }),
          /* @__PURE__ */ jsxs8("ul", { className: "list-disc list-inside pl-4", children: [
            /* @__PURE__ */ jsxs8("li", { children: [
              "Phone: ",
              /* @__PURE__ */ jsx12("a", { href: "tel:+91-11-6926-8029", className: "text-blue-600 hover:text-blue-800 underline transition-colors duration-200", children: "+91-11-6926-8029" })
            ] }),
            /* @__PURE__ */ jsxs8("li", { children: [
              "By Email: ",
              /* @__PURE__ */ jsx12("a", { href: "mailto:contact@mobisec.in", className: "text-blue-600 hover:text-blue-800 underline transition-colors duration-200", children: "contact@mobisec.in" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
};
var TermsOfService_default = TermsOfService;

// client/src/components/common/ScrollToTop.tsx
import { useEffect as useEffect2 } from "react";
import { useLocation as useLocation2 } from "wouter";
var ScrollToTop = () => {
  const [location] = useLocation2();
  useEffect2(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};
var ScrollToTop_default = ScrollToTop;

// client/src/App.tsx
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
function Router() {
  return /* @__PURE__ */ jsxs9(Routes, { children: [
    /* @__PURE__ */ jsx13(Route, { path: "/", element: /* @__PURE__ */ jsx13(Home_default, {}) }),
    /* @__PURE__ */ jsx13(Route, { path: "/terms-services", element: /* @__PURE__ */ jsx13(TermsOfService_default, {}) }),
    /* @__PURE__ */ jsx13(Route, { element: /* @__PURE__ */ jsx13(NotFound, {}) })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs9(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx13(ScrollToTop_default, {}),
    /* @__PURE__ */ jsx13(Layout_default, { children: /* @__PURE__ */ jsx13(Router, {}) }),
    /* @__PURE__ */ jsx13(Toaster, {})
  ] });
}
var App_default = App;

// server/index.ts
import { fileURLToPath as fileURLToPath3 } from "url";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    let capturedJsonResponse2 = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(`[Error]: ${status} - ${message}`);
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 3e3;
  const __filename3 = fileURLToPath3(import.meta.url);
  const __dirname3 = path3.dirname(__filename3);
  const buildPath = path3.resolve(__dirname3, "build");
  app.use(express2.static(buildPath));
  app.get("*", (req, res) => {
    const htmlFilePath = path3.resolve(buildPath, "index.html");
    fs2.readFile(htmlFilePath, "utf8", (err, htmlData) => {
      if (err) {
        return res.status(500).send("Error loading HTML");
      }
      const location = req.url;
      const markup = ReactDOMServer.renderToString(
        React7.createElement(
          StaticRouter,
          { location },
          React7.createElement(App_default)
        )
      );
      const finalHtml = htmlData.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
      res.send(finalHtml);
    });
  });
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
