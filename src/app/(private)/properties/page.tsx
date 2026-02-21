import { Suspense } from "react";
import { requireFullAuth } from "@/lib/require-auth";
import {
    PageContainer,
    PageHeader,
    PageHeaderContent,
    PageTitle,
    PageDescription,
    PageActions,
    PageContent,
} from "@/components/layout/page-container";
import AddPropertyButton from "./components/add-property-button";
import { SearchInput } from "./components/search-input";
import { PropertiesTableSkeleton } from "./components/properties-table-skeleton";
import { TableContainer } from "./components/table-container";

const PropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; page?: string }>;
}) => {
    await requireFullAuth();
    const { query, page } = await searchParams;

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Imóveis</PageTitle>
                    <PageDescription>
                        Gerencie os imóveis cadastrados na sua carteira.
                    </PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddPropertyButton />
                </PageActions>
            </PageHeader>
            <PageContent>
                <div className="space-y-4">
                    <SearchInput placeholder="Buscar por título..." />

                    <Suspense
                        key={(query || "") + (page || "1")}
                        fallback={<PropertiesTableSkeleton />}
                    >
                        <TableContainer query={query} page={page || "1"} />
                    </Suspense>
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default PropertiesPage;
