import { InferSelectModel } from "drizzle-orm";
import { opportunity } from "@/db/schema/opportunity-schema";
import { lead } from "@/db/schema/lead-schema";

export type Opportunity = InferSelectModel<typeof opportunity>;
export type Lead = InferSelectModel<typeof lead>;

export type OpportunityWithLead = Opportunity & {
    lead: Lead;
};
