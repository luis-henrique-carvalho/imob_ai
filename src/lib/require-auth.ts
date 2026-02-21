"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function requireFullAuth() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
        redirect("/login");
    }

    return session;
}
