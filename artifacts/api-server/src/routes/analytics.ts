import { Router } from "express";
import { db, ordersTable, productsTable, usersTable } from "@workspace/db";
import { count, sum } from "drizzle-orm";
import jwt from "jsonwebtoken";

const analyticsRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";

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

analyticsRouter.get("/", requireAdmin, async (req, res) => {
  try {
    const totalOrdersRes = await db.select({ value: count() }).from(ordersTable);
    const totalRevenueRes = await db.select({ value: sum(ordersTable.totalAmount) }).from(ordersTable);
    const totalProductsRes = await db.select({ value: count() }).from(productsTable);
    const totalUsersRes = await db.select({ value: count() }).from(usersTable);

    res.json({
      totalOrders: totalOrdersRes[0]?.value || 0,
      totalRevenue: totalRevenueRes[0]?.value || 0,
      totalProducts: totalProductsRes[0]?.value || 0,
      totalUsers: totalUsersRes[0]?.value || 0,
    });
  } catch (error) {
    console.error("Error fetching analytics", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default analyticsRouter;
