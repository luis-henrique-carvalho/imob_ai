"use server";

import { db } from "@/db";
import { property } from "@/db/schema/property-schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { and, eq, ilike, sql, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

const getPropertiesSchema = z.object({
    page: z.string().default("1"),
    limit: z.string().default("10"),
    query: z.string().optional(),
});

export const getProperties = actionClient
    .inputSchema(getPropertiesSchema)
    .action(async ({ parsedInput }) => {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return { success: false, serverError: "Não autorizado." };
        }

        try {
            const page = Math.max(1, parseInt(parsedInput.page));
            const limit = Math.max(1, parseInt(parsedInput.limit));
            const offset = (page - 1) * limit;

            const conditions = [eq(property.userId, session.user.id)];

            if (parsedInput.query) {
                conditions.push(ilike(property.title, `%${parsedInput.query}%`));
            }

            const whereClause = and(...conditions);

            const [properties, countResult] = await Promise.all([
                db
                    .select()
                    .from(property)
                    .where(whereClause)
                    .orderBy(desc(property.createdAt))
                    .limit(limit)
                    .offset(offset),
                db
                    .select({ count: sql<number>`count(*)` })
                    .from(property)
                    .where(whereClause),
            ]);

            const total = Number(countResult[0].count);
            const totalPages = Math.ceil(total / limit);

            return {
                success: true,
                data: {
                    properties,
                    total,
                    totalPages,
                    currentPage: page,
                },
            };
        } catch {
            return { success: false, serverError: "Erro ao buscar imóveis." };
        }
    });
