"use server";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
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
            const data = await db.query.opportunity.findMany({
                where: (opp, { eq }) => eq(opp.userId, session.user.id),
                orderBy: (opp, { desc }) => [desc(opp.createdAt)],
                with: {
                    lead: true,
                },
            });

            return {
                success: true,
                data,
            };
        } catch (error) {
            return { success: false, serverError: "Erro ao buscar oportunidades." };
        }
    });
