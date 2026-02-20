import { relations } from "drizzle-orm";
import { user, session, account } from "./auth-schema";
import { property } from "./property-schema";
import { lead } from "./lead-schema";
import { opportunity } from "./opportunity-schema";
import { message } from "./message-schema";

// Auth relations

export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
    properties: many(property),
    leads: many(lead),
    opportunities: many(opportunity),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));

// Business entity relations

export const propertyRelations = relations(property, ({ one }) => ({
    user: one(user, {
        fields: [property.userId],
        references: [user.id],
    }),
}));

export const leadRelations = relations(lead, ({ one, many }) => ({
    user: one(user, {
        fields: [lead.userId],
        references: [user.id],
    }),
    opportunities: many(opportunity),
}));

export const opportunityRelations = relations(
    opportunity,
    ({ one, many }) => ({
        user: one(user, {
            fields: [opportunity.userId],
            references: [user.id],
        }),
        lead: one(lead, {
            fields: [opportunity.leadId],
            references: [lead.id],
        }),
        property: one(property, {
            fields: [opportunity.propertyId],
            references: [property.id],
        }),
        messages: many(message),
    }),
);

export const messageRelations = relations(message, ({ one }) => ({
    opportunity: one(opportunity, {
        fields: [message.opportunityId],
        references: [opportunity.id],
    }),
}));
