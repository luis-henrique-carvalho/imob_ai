import { InferSelectModel } from "drizzle-orm";
import { opportunity } from "@/db/schema/opportunity-schema";
import { lead } from "@/db/schema/lead-schema";
import { property } from "@/db/schema/property-schema";
import { message } from "@/db/schema/message-schema";

export type Opportunity = InferSelectModel<typeof opportunity>;
export type Lead = InferSelectModel<typeof lead>;
export type Property = InferSelectModel<typeof property>;
export type Message = InferSelectModel<typeof message>;

export type OpportunityWithLead = Opportunity & {
    lead: Lead;
    property?: Property | null;
    messages?: Message[];
};
