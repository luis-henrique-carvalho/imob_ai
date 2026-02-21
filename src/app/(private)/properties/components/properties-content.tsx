import { Suspense } from "react";
import {
    PageContainer,
    PageHeader,
    PageHeaderContent,
    PageTitle,
    PageDescription,
    PageActions,
    PageContent,
} from "@/components/layout/page-container";
import { getProperties } from "../actions";
import { columns } from "./table/table-columns";
import { PropertiesDataTable } from "./table/properties-data-table";
import AddPropertyButton from "./add-property-button";
import { SearchInput } from "./search-input";
import { DynamicPagination } from "./dynamic-pagination";

interface PropertiesContentProps {
    query?: string;
    page: string;
}

export async function PropertiesContent({
    query,
    page,
}: PropertiesContentProps) {
    const result = await getProperties({
        limit: "10",
        page: String(query ? 1 : page),
        query,
    });

    const data = result?.data;

    if (!data?.success || !data.data) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageHeaderContent>
                        <PageTitle>Imóveis</PageTitle>
                        <PageDescription>
                            Gerencie os imóveis cadastrados na sua carteira.
                        </PageDescription>
                    </PageHeaderContent>
                </PageHeader>
                <PageContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-sm text-muted-foreground">
                            Erro ao carregar imóveis. Tente novamente.
                        </p>
                    </div>
                </PageContent>
            </PageContainer>
        );
    }

    const { properties, totalPages, currentPage } = data.data;

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
                <Suspense>
                    <SearchInput placeholder="Buscar por título..." />
                </Suspense>
                <PropertiesDataTable columns={columns} data={properties} />
                <DynamicPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </PageContent>
        </PageContainer>
    );
}
