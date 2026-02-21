"use server";

import { db } from "@/db";
import { opportunity } from "@/db/schema/opportunity-schema";
import { lead } from "@/db/schema/lead-schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

const getOpportunitiesSchema = z.object({});

export const getOpportunities = actionClient
    .inputSchema(getOpportunitiesSchema)
    .action(async () => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { success: false, serverError: "Não autorizado." };
        }

        try {
            const data = await db
                .select()
                .from(opportunity)
                .innerJoin(lead, eq(opportunity.leadId, lead.id))
                .where(eq(opportunity.userId, session.user.id))
                .orderBy(desc(opportunity.createdAt));

            // Return as the OpportunityWithLead format
            const mappedData = data.map((row) => ({
                ...row.opportunity,
                lead: row.lead,
            }));

            return {
                success: true,
                data: mappedData,
            };
        } catch (error) {
            return { success: false, serverError: "Erro ao buscar oportunidades." };
        }
    });
