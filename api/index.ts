// Vercel Serverless Function — self-contained Express app
// Vercel bundles this file directly; workspace:* imports are not available here.
// All DB/auth logic is inlined so the serverless function is fully portable.

import express from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { eq, desc, count, sum } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Pool } = pkg;

// ─── Database Schema (inlined) ────────────────────────────────────────────────

const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  role: text("role").default("customer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const productsTable = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  priceStr: text("price_str").notNull(),
  image: text("image").notNull(),
  isOutOfStock: boolean("is_out_of_stock").default(false).notNull(),
  category: text("category").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id),
  status: text("status").default("Pending").notNull(),
  totalAmount: integer("total_amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  dateNeeded: text("date_needed").notNull(),
  isExpress: boolean("is_express").default(false).notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  orderNotes: text("order_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const orderItemsTable = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => ordersTable.id).notNull(),
  productId: text("product_id").references(() => productsTable.id).notNull(),
  quantity: integer("quantity").notNull(),
  priceAtTime: integer("price_at_time").notNull(),
});

const schema = { usersTable, productsTable, ordersTable, orderItemsTable };

// ─── Database Connection ──────────────────────────────────────────────────────

let db: ReturnType<typeof drizzle<typeof schema>>;

function getDb() {
  if (!db) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema });
  }
  return db;
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";

function requireAdmin(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization as string | undefined;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
    if (decoded.role !== "admin") return res.status(403).json({ error: "Forbidden" });
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

function optionalAuth(req: any, _res: any, next: any) {
  const authHeader = req.headers.authorization as string | undefined;
  if (authHeader?.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      (req as any).user = jwt.verify(token, JWT_SECRET);
    } catch {}
  }
  next();
}

// ─── Express App ──────────────────────────────────────────────────────────────

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Health
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ── Auth routes ────────────────────────────────────────────────────────────────

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body as { email: string; password: string; name?: string };
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const database = getDb();
    const existing = await database.query.usersTable.findFirst({ where: eq(usersTable.email, email) });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const allUsers = await database.select().from(usersTable);
    const role = allUsers.length === 0 ? "admin" : "customer";

    const [user] = await database.insert(usersTable).values({ email, password: hashed, name, role }).returning();
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const database = getDb();
    const user = await database.query.usersTable.findFirst({ where: eq(usersTable.email, email) });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/auth/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization as string | undefined;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const database = getDb();
    const user = await database.query.usersTable.findFirst({ where: eq(usersTable.id, decoded.userId) });
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// ── Products routes ────────────────────────────────────────────────────────────

app.get("/api/products", async (_req, res) => {
  try {
    const products = await getDb().query.productsTable.findMany();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await getDb().query.productsTable.findFirst({ where: eq(productsTable.id, req.params.id) });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/products", requireAdmin, async (req: any, res) => {
  try {
    const { name, price, priceStr, image, category, isFeatured } = req.body;
    const id = req.body.id || `p${Math.floor(Math.random() * 100000)}`;
    const [product] = await getDb().insert(productsTable).values({
      id, name, price: Number(price), priceStr, image, category,
      isFeatured: Boolean(isFeatured), isOutOfStock: false,
    }).returning();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/products/:id", requireAdmin, async (req: any, res) => {
  try {
    const { name, price, priceStr, image, category, isFeatured, isOutOfStock } = req.body;
    const [product] = await getDb().update(productsTable).set({
      name, price: Number(price), priceStr, image, category,
      isFeatured: Boolean(isFeatured), isOutOfStock: Boolean(isOutOfStock),
    }).where(eq(productsTable.id, req.params.id)).returning();
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/products/:id", requireAdmin, async (req: any, res) => {
  try {
    const [product] = await getDb().delete(productsTable).where(eq(productsTable.id, req.params.id)).returning();
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Orders routes ─────────────────────────────────────────────────────────────

app.post("/api/orders", optionalAuth, async (req: any, res) => {
  try {
    const { totalAmount, paymentMethod, dateNeeded, isExpress, customerName, customerPhone, customerEmail, orderNotes, items } = req.body;
    const [order] = await getDb().insert(ordersTable).values({
      userId: req.user?.userId || null,
      totalAmount: Number(totalAmount), paymentMethod, dateNeeded,
      isExpress: Boolean(isExpress), customerName, customerPhone, customerEmail, orderNotes, status: "Pending",
    }).returning();

    if (items && Array.isArray(items)) {
      for (const item of items) {
        await getDb().insert(orderItemsTable).values({
          orderId: order.id, productId: item.productId, quantity: item.quantity, priceAtTime: item.priceAtTime,
        });
      }
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/orders", requireAdmin, async (_req, res) => {
  try {
    const orders = await getDb().query.ordersTable.findMany({ orderBy: [desc(ordersTable.createdAt)] });
    res.json(orders);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/orders/:id/status", requireAdmin, async (req: any, res) => {
  try {
    const { status } = req.body;
    const [order] = await getDb().update(ordersTable).set({ status })
      .where(eq(ordersTable.id, parseInt(req.params.id))).returning();
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Analytics route ────────────────────────────────────────────────────────────

app.get("/api/analytics", requireAdmin, async (_req, res) => {
  try {
    const database = getDb();
    const [totalOrdersRes, totalRevenueRes, totalProductsRes, totalUsersRes] = await Promise.all([
      database.select({ value: count() }).from(ordersTable),
      database.select({ value: sum(ordersTable.totalAmount) }).from(ordersTable),
      database.select({ value: count() }).from(productsTable),
      database.select({ value: count() }).from(usersTable),
    ]);

    res.json({
      totalOrders: totalOrdersRes[0]?.value || 0,
      totalRevenue: totalRevenueRes[0]?.value || 0,
      totalProducts: totalProductsRes[0]?.value || 0,
      totalUsers: totalUsersRes[0]?.value || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── Users route (Admin) ────────────────────────────────────────────────────────

app.get("/api/users", requireAdmin, async (_req, res) => {
  try {
    const users = await getDb().select({
      id: usersTable.id,
      email: usersTable.email,
      name: usersTable.name,
      role: usersTable.role,
      createdAt: usersTable.createdAt,
    }).from(usersTable);
    res.json(users);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/users/:id/role", requireAdmin, async (req: any, res) => {
  try {
    const { role } = req.body;
    const [user] = await getDb().update(usersTable).set({ role })
      .where(eq(usersTable.id, parseInt(req.params.id))).returning({
        id: usersTable.id, email: usersTable.email, name: usersTable.name, role: usersTable.role,
      });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Export for Vercel ────────────────────────────────────────────────────────

export default app;
