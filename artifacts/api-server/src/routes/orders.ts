import { Router } from "express";
import { db, ordersTable, orderItemsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import jwt from "jsonwebtoken";

const ordersRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";

// Optional auth middleware to extract user ID if logged in
const optionalAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, role: string };
      req.user = decoded;
    } catch (e) {}
  }
  next();
};

// Admin middleware
const requireAdmin = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, role: string };
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// POST order (Checkout)
ordersRouter.post("/", optionalAuth, async (req: any, res: any) => {
  try {
    const { totalAmount, paymentMethod, dateNeeded, isExpress, customerName, customerPhone, customerEmail, orderNotes, items } = req.body;
    
    const [order] = await db.insert(ordersTable).values({
      userId: req.user?.userId || null,
      totalAmount: Number(totalAmount),
      paymentMethod,
      dateNeeded,
      isExpress: Boolean(isExpress),
      customerName,
      customerPhone,
      customerEmail,
      orderNotes,
      status: "Pending",
    }).returning();

    // Insert order items
    if (items && Array.isArray(items)) {
      for (const item of items) {
        await db.insert(orderItemsTable).values({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtTime: item.priceAtTime,
        });
      }
    }

    res.json(order);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all orders (Admin)
ordersRouter.get("/", requireAdmin, async (req, res) => {
  try {
    const orders = await db.query.ordersTable.findMany({
      orderBy: [desc(ordersTable.createdAt)],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update order status (Admin)
ordersRouter.put("/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const [order] = await db.update(ordersTable)
      .set({ status })
      .where(eq(ordersTable.id, parseInt(req.params.id)))
      .returning();

    if (!order) return res.status(404).json({ error: "Order not found" });
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default ordersRouter;
