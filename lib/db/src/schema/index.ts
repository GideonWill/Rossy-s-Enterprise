import { pgTable, text, serial, boolean, integer, timestamp, decimal } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  role: text("role").default("customer").notNull(), // 'admin' or 'customer'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productsTable = pgTable("products", {
  id: text("id").primaryKey(), // using string ID to match current hardcoded 'p1', 'p2' etc.
  name: text("name").notNull(),
  price: integer("price").notNull(),
  priceStr: text("price_str").notNull(),
  image: text("image").notNull(),
  isOutOfStock: boolean("is_out_of_stock").default(false).notNull(),
  category: text("category").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id), // nullable for guest checkout
  status: text("status").default("Pending").notNull(), // Pending, Processing, Completed, Cancelled
  totalAmount: integer("total_amount").notNull(),
  paymentMethod: text("payment_method").notNull(), // paystack, pickup
  dateNeeded: text("date_needed").notNull(),
  isExpress: boolean("is_express").default(false).notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  orderNotes: text("order_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => ordersTable.id).notNull(),
  productId: text("product_id").references(() => productsTable.id).notNull(),
  quantity: integer("quantity").notNull(),
  priceAtTime: integer("price_at_time").notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type User = typeof usersTable.$inferSelect;

export type InsertProduct = typeof productsTable.$inferInsert;
export type Product = typeof productsTable.$inferSelect;

export type InsertOrder = typeof ordersTable.$inferInsert;
export type Order = typeof ordersTable.$inferSelect;

export type InsertOrderItem = typeof orderItemsTable.$inferInsert;
export type OrderItem = typeof orderItemsTable.$inferSelect;