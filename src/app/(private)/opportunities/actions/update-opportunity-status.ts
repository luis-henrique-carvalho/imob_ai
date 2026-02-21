"use server";

import { db } from "@/db";
import { opportunity } from "@/db/schema/opportunity-schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const updateOpportunityStatusSchema = z.object({
    id: z.string(),
    status: z.enum(["NEW", "QUALIFIED", "IN_PROGRESS", "WON", "LOST"]),
});

export const updateOpportunityStatus = actionClient
    .inputSchema(updateOpportunityStatusSchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { success: false, serverError: "Não autorizado." };
        }

        try {
            await db
                .update(opportunity)
                .set({ status: parsedInput.status })
                .where(
                    and(
                        eq(opportunity.id, parsedInput.id),
                        eq(opportunity.userId, session.user.id)
                    )
                );

            revalidatePath("/opportunities");

            return {
                success: true,
                message: "Status atualizado com sucesso.",
            };
        } catch (error) {
            return { success: false, serverError: "Erro ao atualizar status da oportunidade." };
        }
    });
