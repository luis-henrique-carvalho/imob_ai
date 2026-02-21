import {
    PageContainer,
    PageHeader,
    PageHeaderContent,
    PageTitle,
    PageDescription,
    PageActions,
    PageContent,
} from "@/components/layout/page-container";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertiesTableSkeleton } from "./components/properties-table-skeleton";

export default function PropertiesLoading() {
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
                    <Skeleton className="h-9 w-[120px]" />
                </PageActions>
            </PageHeader>
            <PageContent>
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <PropertiesTableSkeleton />
                </div>
            </PageContent>
        </PageContainer>
    );
}
