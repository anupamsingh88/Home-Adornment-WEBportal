import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import fetch from 'node-fetch';
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication endpoints (/api/login, /api/register, /api/logout, /api/user)
  setupAuth(app);

  // Add product API routes
  app.get("/api/products", (req, res) => {
    // For now, we'll return a simple message, later we can add actual database integration
    res.json({ message: "Products API - Coming soon" });
  });

  // Add cart API routes
  app.post("/api/cart/add", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ message: "Product added to cart" });
  });

  // PayPal payment verification endpoint
  app.post("/api/verify-paypal-payment", async (req, res) => {
    const { orderID } = req.body;
    
    if (!orderID) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }
    
    try {
      // Get access token from PayPal
      const authResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID || ''}:${process.env.PAYPAL_SECRET || ''}`
          ).toString("base64")}`
        },
        body: "grant_type=client_credentials"
      });
      
      const authData = await authResponse.json() as { access_token: string };
      const access_token = authData.access_token;
      
      // Verify the payment
      const orderResponse = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      });
      
      const orderData = await orderResponse.json() as { status: string };
      
      // Verify the payment status
      if (orderData.status === "COMPLETED") {
        // Here you could save the order in your database
        return res.json({ 
          success: true, 
          message: "Payment verified successfully",
          data: orderData
        });
      } else {
        return res.status(400).json({ 
          success: false, 
          message: "Payment not completed", 
          status: orderData.status 
        });
      }
      
    } catch (error) {
      console.error("PayPal verification error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Error verifying payment",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Add PayPal webhook endpoint for payment notifications (would need to be configured in PayPal Developer Dashboard)
  app.post("/api/paypal-webhook", async (req, res) => {
    // This endpoint would handle PayPal webhooks (payment completions, refunds, etc.)
    // Would need validation using PayPal webhook signature
    
    const event = req.body;
    
    // Log the event for debugging
    console.log("PayPal webhook event:", JSON.stringify(event, null, 2));
    
    // Acknowledge receipt of the event
    res.status(200).end();
  });

  const httpServer = createServer(app);

  return httpServer;
}
