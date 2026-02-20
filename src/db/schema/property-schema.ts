import {
    pgTable,
    text,
    integer,
    boolean,
    timestamp,
    index,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const property = pgTable(
    "property",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        title: text("title").notNull(),
        description: text("description").notNull(),
        price: integer("price").notNull(),
        isActive: boolean("is_active").default(true).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("property_userId_idx").on(table.userId)],
);
