import { requireFullAuth } from "@/lib/require-auth";
import {
    PageContainer,
    PageHeader,
    PageHeaderContent,
    PageTitle,
    PageDescription,
    PageContent,
} from "@/components/layout/page-container";
import { OpportunitiesKanban } from "./components/opportunities-kanban";
import { getOpportunities } from "./actions/get-opportunities";

const OpportunitiesPage = async () => {
    await requireFullAuth();

    const response = await getOpportunities({});
    const opportunities = response?.data?.data || [];

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Oportunidades</PageTitle>
                    <PageDescription>
                        Acompanhe o progresso das suas negociações e oportunidades de venda.
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <OpportunitiesKanban initialData={opportunities} />
            </PageContent>
        </PageContainer>
    );
};

export default OpportunitiesPage;
