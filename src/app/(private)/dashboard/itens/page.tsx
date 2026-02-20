import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    PageContainer,
    PageHeader,
    PageHeaderContent,
    PageTitle,
    PageDescription,
    PageActions,
    PageContent,
} from '@/components/layout/page-container';

export default function ItensPage() {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Itens</PageTitle>
                    <PageDescription>
                        Gerencie todos os itens do sistema.
                    </PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Item
                    </Button>
                </PageActions>
            </PageHeader>

            <PageContent>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <div className="flex flex-col items-center justify-center space-y-2 py-12 text-center">
                            <div className="rounded-full bg-muted p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6 text-muted-foreground"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 3.5h3M3.375 7.5h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold">Nenhum item cadastrado</h3>
                            <p className="text-sm text-muted-foreground">
                                Você ainda não possui itens em sua lista. Comece criando um agora.
                            </p>
                        </div>
                    </div>
                </div>
            </PageContent>
        </PageContainer>
    );
}
