import { Suspense } from "react";
import { requireFullAuth } from "@/lib/require-auth";
import { PropertiesContent } from "./components/properties-content";

const PropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; page?: string }>;
}) => {
    await requireFullAuth();
    const { query, page } = await searchParams;

    return (
        <Suspense
            fallback={
                <div className="flex flex-1 items-center justify-center py-12">
                    <p className="text-sm text-muted-foreground">
                        Carregando imóveis...
                    </p>
                </div>
            }
        >
            <PropertiesContent query={query} page={page || "1"} />
        </Suspense>
    );
};

export default PropertiesPage;
