import { property } from "@/db/schema/property-schema";

export type Property = typeof property.$inferSelect;
