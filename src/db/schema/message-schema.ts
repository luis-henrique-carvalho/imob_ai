import { pgTable, text, timestamp, index, pgEnum } from "drizzle-orm/pg-core";
import { opportunity } from "./opportunity-schema";

const messageRoleEnum = pgEnum("message_role", [
    "user",
    "assistant",
    "system",
]);

export const message = pgTable(
    "message",
    {
        id: text("id").primaryKey(),
        opportunityId: text("opportunity_id")
            .notNull()
            .references(() => opportunity.id, { onDelete: "cascade" }),
        role: messageRoleEnum("role").notNull(),
        content: text("content").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [
        index("message_opportunityId_createdAt_idx").on(
            table.opportunityId,
            table.createdAt,
        ),
    ],
);
