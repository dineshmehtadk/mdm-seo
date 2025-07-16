import express from "express";
import React from "react";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../client/src/App';
import { fileURLToPath } from 'url';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    let capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });

  // Optional: Log error instead of throwing
  console.error(`[Error]: ${status} - ${message}`);
});

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 3000;
  // server.listen({
  //   port,
  //   host: "127.0.0.1",
  //   reusePort: true,
    
  // }, () => {
  //   log(`serving on port ${port}`);
  // });


  const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const buildPath = path.resolve(__dirname, 'build');

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  const htmlFilePath = path.resolve(buildPath, 'index.html');

  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    if (err) {
      return res.status(500).send('Error loading HTML');
    }


    const location: string = req.url;

  const markup = ReactDOMServer.renderToString(
  React.createElement(StaticRouter, { location: location },
    React.createElement(App)
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
