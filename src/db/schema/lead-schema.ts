import { pgTable, text, timestamp, index, unique } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const lead = pgTable(
    "lead",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        name: text("name"),
        phone: text("phone").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [
        unique("lead_phone_userId_unique").on(table.phone, table.userId),
        index("lead_userId_idx").on(table.userId),
    ],
);
