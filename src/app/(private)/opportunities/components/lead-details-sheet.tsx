"use client";

import { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { OpportunityWithLead } from "../types";
import { MessageHistory } from "./message-history";
import { getOpportunityById } from "../actions/get-opportunity-by-id";
import { Loader2 } from "lucide-react";

interface LeadDetailsSheetProps {
    opportunityId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

const statusMap: Record<string, string> = {
    NEW: "Novo",
    QUALIFIED: "Qualificado",
    IN_PROGRESS: "Em Atendimento",
    WON: "Ganho",
    LOST: "Perdido",
};

export function LeadDetailsSheet({
    opportunityId,
    isOpen,
    onClose,
}: LeadDetailsSheetProps) {
    const [opportunity, setOpportunity] = useState<OpportunityWithLead | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !opportunityId) {
            setOpportunity(null);
            return;
        }

        let mounted = true;
        async function fetchOpportunity() {
            setIsLoading(true);
            const res = await getOpportunityById({ id: opportunityId as string });
            if (!mounted) return;

            if (res?.data?.success && res.data.data) {
                setOpportunity(res.data.data as OpportunityWithLead);
            }
            setIsLoading(false);
        }

        fetchOpportunity();

        return () => {
            mounted = false;
        };
    }, [isOpen, opportunityId]);

    const handleClose = () => {
        onClose();
    };

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col p-0 gap-0">
                {isLoading || !opportunity ? (
                    <>
                        <SheetTitle className="sr-only">
                            {isLoading ? "Carregando detalhes..." : "Nenhuma oportunidade selecionada"}
                        </SheetTitle>
                        <SheetDescription className="sr-only">
                            {isLoading ? "Aguarde enquanto carregamos os detalhes da oportunidade." : "Selecione uma oportunidade no painel para ver seus detalhes."}
                        </SheetDescription>
                        <div className="flex flex-1 items-center justify-center p-8">
                            {isLoading ? (
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
                            ) : (
                                <span className="text-muted-foreground">Nenhuma oportunidade selecionada</span>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <SheetHeader className="p-6 pb-4 border-b">
                            <SheetTitle className="text-xl">{opportunity.lead.name || "Sem Nome"}</SheetTitle>
                            <SheetDescription className="flex items-center gap-2 mt-1">
                                <span>{opportunity.lead.phone}</span>
                                <span className="text-muted-foreground/30">•</span>
                                <Badge variant="secondary" className="font-normal text-xs">
                                    {statusMap[opportunity.status] || opportunity.status}
                                </Badge>
                            </SheetDescription>
                        </SheetHeader>

                        {(opportunity.extractedBudget || opportunity.extractedPropertyType || opportunity.extractedUrgency) && (
                            <div className="flex flex-col gap-3 p-6 border-b bg-muted/5">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Detalhes Extraídos pela IA
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                                    {opportunity.extractedBudget && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs text-muted-foreground">Orçamento</span>
                                            <span className="text-sm font-medium">R$ {opportunity.extractedBudget}</span>
                                        </div>
                                    )}
                                    {opportunity.extractedPropertyType && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs text-muted-foreground">Tipo de Imóvel</span>
                                            <span className="text-sm font-medium">{opportunity.extractedPropertyType}</span>
                                        </div>
                                    )}
                                    {opportunity.extractedUrgency && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs text-muted-foreground">Urgência</span>
                                            <span className="text-sm font-medium">{opportunity.extractedUrgency}</span>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground">Data do Lead</span>
                                        <span className="text-sm font-medium">
                                            {new Date(opportunity.createdAt).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {opportunity.property && (
                            <div className="flex flex-col gap-3 p-6 border-b bg-muted/10">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Imóvel Vinculado
                                </h3>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-medium">{opportunity.property.title}</span>
                                    <span className="text-sm font-semibold text-primary">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(opportunity.property.price ?? 0)}
                                    </span>
                                    <span className="text-xs text-muted-foreground line-clamp-2">
                                        {opportunity.property.description}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="flex-1 overflow-hidden flex flex-col bg-muted/10">
                            <div className="flex items-center px-6 py-3 bg-muted/30 border-b text-sm font-medium text-foreground/80">
                                Histórico de Mensagens
                            </div>
                            <div className="flex-1 overflow-y-auto w-full">
                                <MessageHistory messages={opportunity.messages} />
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
