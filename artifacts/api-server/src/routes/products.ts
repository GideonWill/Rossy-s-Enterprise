import { Router } from "express";
import { db, productsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { usersTable } from "@workspace/db";

const productsRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";

// Middleware to check if user is admin
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

// GET all products
productsRouter.get("/", async (req, res) => {
  try {
    const products = await db.query.productsTable.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET single product
productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await db.query.productsTable.findFirst({
      where: eq(productsTable.id, req.params.id),
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST new product (Admin)
productsRouter.post("/", requireAdmin, async (req, res) => {
  try {
    const { name, price, priceStr, image, category, isFeatured } = req.body;
    
    // generate random ID like p50 if not provided
    const id = req.body.id || `p${Math.floor(Math.random() * 100000)}`;

    const [product] = await db.insert(productsTable).values({
      id,
      name,
      price: Number(price),
      priceStr,
      image,
      category,
      isFeatured: Boolean(isFeatured),
      isOutOfStock: false,
    }).returning();

    res.json(product);
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update product (Admin)
productsRouter.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { name, price, priceStr, image, category, isFeatured, isOutOfStock } = req.body;
    
    const [product] = await db.update(productsTable).set({
      name,
      price: Number(price),
      priceStr,
      image,
      category,
      isFeatured: Boolean(isFeatured),
      isOutOfStock: Boolean(isOutOfStock),
    }).where(eq(productsTable.id, req.params.id)).returning();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE product (Admin)
productsRouter.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const [product] = await db.delete(productsTable)
      .where(eq(productsTable.id, req.params.id))
      .returning();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default productsRouter;
