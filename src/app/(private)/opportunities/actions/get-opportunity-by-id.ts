"use server";

import { db } from "@/db";
import { opportunity } from "@/db/schema/opportunity-schema";
import { lead } from "@/db/schema/lead-schema";
import { property } from "@/db/schema/property-schema";
import { message } from "@/db/schema/message-schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { eq, and, asc } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

const getOpportunityByIdSchema = z.object({
    id: z.string().min(1, "ID é obrigatório"),
});

export const getOpportunityById = actionClient
    .inputSchema(getOpportunityByIdSchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { success: false, serverError: "Não autorizado." };
        }

        try {
            const data = await db.query.opportunity.findFirst({
                where: (opp, { eq, and }) =>
                    and(
                        eq(opp.id, parsedInput.id),
                        eq(opp.userId, session.user.id)
                    ),
                with: {
                    lead: true,
                    property: true,
                    messages: {
                        orderBy: (msg, { asc }) => [asc(msg.createdAt)],
                    },
                },
            });

            if (!data) {
                return { success: false, serverError: "Oportunidade não encontrada." };
            }

            return {
                success: true,
                data,
            };
        } catch (error) {
            return { success: false, serverError: "Erro ao buscar oportunidade." };
        }
    });
