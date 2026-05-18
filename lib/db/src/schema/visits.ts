import { pgTable, serial, text, real, timestamp } from "drizzle-orm/pg-core";

export const visitsTable = pgTable("visits", {
  id: serial("id").primaryKey(),
  ip: text("ip"),
  country: text("country"),
  countryCode: text("country_code"),
  city: text("city"),
  lat: real("lat"),
  lng: real("lng"),
  page: text("page").default("/"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Visit = typeof visitsTable.$inferSelect;
