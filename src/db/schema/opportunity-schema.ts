import { pgTable, text, boolean, timestamp, index, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { lead } from "./lead-schema";
import { property } from "./property-schema";

const opportunityStatusEnum = pgEnum("opportunity_status", [
    "NEW",
    "QUALIFIED",
    "IN_PROGRESS",
    "WON",
    "LOST",
]);

export const opportunity = pgTable(
    "opportunity",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        leadId: text("lead_id")
            .notNull()
            .references(() => lead.id, { onDelete: "cascade" }),
        propertyId: text("property_id").references(() => property.id),

        status: opportunityStatusEnum("status").default("NEW").notNull(),
        position: text("position"),
        isAiPaused: boolean("is_ai_paused").default(false).notNull(),
        extractedBudget: text("extracted_budget"),
        extractedUrgency: text("extracted_urgency"),
        extractedPropertyType: text("extracted_property_type"),

        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [
        index("opportunity_userId_status_idx").on(table.userId, table.status),
    ],
);
