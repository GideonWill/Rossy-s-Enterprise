import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // First user becomes admin, others become customer
    const countRes = await db.select().from(usersTable);
    const role = countRes.length === 0 ? "admin" : "customer";

    const [user] = await db.insert(usersTable).values({
      email,
      password: hashedPassword,
      name,
      role,
    }).returning();

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, decoded.userId),
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default authRouter;
