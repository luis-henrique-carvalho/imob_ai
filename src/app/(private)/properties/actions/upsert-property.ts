"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/db";
import { property } from "@/db/schema/property-schema";
import { upsertPropertySchema } from "../schemas/upsert-property-schema";

export const upsertProperty = actionClient
    .inputSchema(upsertPropertySchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { success: false, serverError: "Não autorizado." };
        }

        try {
            const id = parsedInput.id || crypto.randomUUID();

            await db
                .insert(property)
                .values({
                    ...parsedInput,
                    id,
                    userId: session.user.id,
                })
                .onConflictDoUpdate({
                    target: property.id,
                    set: {
                        ...parsedInput,
                        userId: session.user.id,
                    },
                    where: eq(property.userId, session.user.id),
                });

            revalidatePath("/properties");

            return { success: true, message: "Imóvel salvo com sucesso!" };
        } catch (error: any) {
            const constraintName = error?.cause?.constraint_name as string;

            const constraintMapping: Record<
                string,
                { field: string; message: string }
            > = {
                property_title_user_id_index: {
                    field: "title",
                    message: `O título '${parsedInput.title}' já está em uso.`,
                },
            };

            const mappedError = constraintMapping[constraintName];

            if (mappedError) {
                return {
                    success: false,
                    fieldErrors: { [mappedError.field]: mappedError.message },
                };
            }

            return { success: false, serverError: "Erro ao salvar imóvel." };
        }
    });
