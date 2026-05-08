import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Client } = pg;
import { productsTable } from "./schema/index.js";
import { products } from "../../../artifacts/gifts-n-more/src/data.js"; // Import the hardcoded data

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const client = new Client({ connectionString: process.env.DATABASE_URL });
const db = drizzle(client);

async function seed() {
  await client.connect();
  console.log("🌱 Seeding products to database...");
  
  try {
    for (const product of products) {
      await db.insert(productsTable).values({
        id: product.id,
        name: product.name,
        price: product.price,
        priceStr: product.priceStr,
        image: product.image,
        isOutOfStock: product.isOutOfStock,
        category: product.category,
        isFeatured: product.isFeatured ?? false,
      }).onConflictDoNothing(); // prevent duplicate entries if run multiple times
      console.log(`✅ Seeded product: ${product.name}`);
    }
    console.log("🎉 Seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await client.end();
    process.exit(0);
  }
}

seed();
