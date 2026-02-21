"use client";

import { GripVertical, Bot, UserIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
    Kanban,
    KanbanBoard,
    KanbanColumn,
    KanbanColumnHandle,
    KanbanItem,
    KanbanOverlay,
} from "@/components/ui/kanban";
import { OpportunityWithLead } from "../types";
import { updateOpportunityStatus } from "../actions/update-opportunity-status";
import { toggleAiPause } from "../actions/toggle-ai-pause";
import { LeadDetailsSheet } from "./lead-details-sheet";

const COLUMN_TITLES: Record<string, string> = {
    NEW: "Novos",
    QUALIFIED: "Qualificados",
    IN_PROGRESS: "Em Atendimento",
    WON: "Ganhos",
    LOST: "Perdidos",
};

interface OpportunitiesKanbanProps {
    initialData: OpportunityWithLead[];
}

const groupOpportunities = (data: OpportunityWithLead[]) => {
    return {
        NEW: data.filter((d) => d.status === "NEW"),
        QUALIFIED: data.filter((d) => d.status === "QUALIFIED"),
        IN_PROGRESS: data.filter((d) => d.status === "IN_PROGRESS"),
        WON: data.filter((d) => d.status === "WON"),
        LOST: data.filter((d) => d.status === "LOST"),
    };
};

export function OpportunitiesKanban({ initialData }: OpportunitiesKanbanProps) {
    const [columns, setColumns] = React.useState<Record<string, OpportunityWithLead[]>>(() =>
        groupOpportunities(initialData)
    );
    const [isPending, startTransition] = React.useTransition();

    const [selectedOpportunityId, setSelectedOpportunityId] = React.useState<string | null>(null);
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);

    const handleCardClick = React.useCallback((opp: OpportunityWithLead) => {
        setSelectedOpportunityId(opp.id);
        setIsSheetOpen(true);
    }, []);

    React.useEffect(() => {
        setColumns(groupOpportunities(initialData));
    }, [initialData]);

    const dragStartColumns = React.useRef<Record<string, OpportunityWithLead[]>>(columns);
    const columnsRef = React.useRef(columns);

    React.useEffect(() => {
        columnsRef.current = columns;
    }, [columns]);

    const handleValueChange = (newColumns: Record<string, OpportunityWithLead[]>) => {
        setColumns(newColumns);
    };

    const handleDragStart = () => {
        dragStartColumns.current = columns;
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const movedItemId = active.id as string;
        const overId = over.id as string;

        let oldStatus: string | null = null;
        for (const [status, items] of Object.entries(dragStartColumns.current)) {
            if (items.some((item) => item.id === movedItemId)) {
                oldStatus = status;
                break;
            }
        }

        let newStatus: string | null = null;
        // Check if overId is a status itself
        if (overId in columnsRef.current) {
            newStatus = overId;
        } else {
            // Find which column the overId (an item) belongs to in the current state
            for (const [status, items] of Object.entries(columnsRef.current)) {
                if (items.some((item) => item.id === overId)) {
                    newStatus = status;
                    break;
                }
            }
        }

        if (movedItemId && newStatus && newStatus !== oldStatus) {
            startTransition(async () => {
                const res = await updateOpportunityStatus({
                    id: movedItemId,
                    status: newStatus as any,
                });
                if (res?.data?.success) {
                    toast.success("Oportunidade movida com sucesso!");
                } else {
                    toast.error(res?.data?.serverError || "Erro ao mover oportunidade.");
                    setColumns(dragStartColumns.current);
                }
            });
        }
    };

    return (
        <>
            <Kanban
                value={columns}
                onValueChange={handleValueChange}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                getItemValue={(item) => item.id}
            >
                <KanbanBoard className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 min-h-[calc(80vh-10rem)]">
                    {Object.entries(columns).map(([columnValue, tasks]) => (
                        <TaskColumn key={columnValue} value={columnValue} tasks={tasks} onCardClick={handleCardClick} />
                    ))}
                </KanbanBoard>
                <KanbanOverlay>
                    {({ value, variant }) => {
                        if (variant === "column") {
                            const tasks = columns[value] ?? [];
                            return <TaskColumn value={value} tasks={tasks} />;
                        }

                        const opp = Object.values(columns)
                            .flat()
                            .find((task) => task.id === value);

                        if (!opp) return null;

                        return <OpportunityCard opp={opp} onClick={() => handleCardClick(opp)} />;
                    }}
                </KanbanOverlay>
            </Kanban>
            <LeadDetailsSheet
                opportunityId={selectedOpportunityId}
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
            />
        </>
    );
}

interface OpportunityCardProps
    extends Omit<React.ComponentProps<typeof KanbanItem>, "value"> {
    opp: OpportunityWithLead;
    onClick?: () => void;
}

function OpportunityCard({ opp, onClick, ...props }: OpportunityCardProps) {
    const [isAiPaused, setIsAiPaused] = React.useState(opp.isAiPaused);

    const handleToggleAi = async (checked: boolean) => {
        const originalStatus = isAiPaused;
        setIsAiPaused(checked);

        const res = await toggleAiPause({ id: opp.id, isAiPaused: checked });

        if (res?.data?.success) {
            toast.success(checked ? "IA Pausada para este lead" : "IA reativada para este lead");
        } else {
            toast.error(res?.data?.serverError || "Erro ao alterar estado da IA.");
            setIsAiPaused(originalStatus);
        }
    };

    return (
        <KanbanItem key={opp.id} value={opp.id} asChild {...props}>
            <div
                className="rounded-md border bg-card p-3 shadow-xs hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing"
                onClick={() => {
                    if (onClick) onClick();
                }}
            >
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <span className="line-clamp-1 font-medium text-sm">
                            {opp.lead.name || "Sem Nome"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground text-xs">
                        <span className="line-clamp-1">{opp.lead.phone}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                        {opp.extractedBudget && (
                            <Badge variant="outline" className="text-[10px] px-1 h-4">
                                R$ {opp.extractedBudget}
                            </Badge>
                        )}
                        {opp.extractedUrgency && (
                            <Badge variant="secondary" className="text-[10px] px-1 h-4">
                                {opp.extractedUrgency}
                            </Badge>
                        )}
                        {opp.extractedPropertyType && (
                            <Badge variant="default" className="text-[10px] px-1 h-4">
                                {opp.extractedPropertyType}
                            </Badge>
                        )}
                    </div>

                    <div
                        className="mt-2 flex items-center justify-between border-t pt-2 cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-1.5 object-contain">
                            {isAiPaused ? (
                                <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            ) : (
                                <Bot className="h-3.5 w-3.5 text-blue-500" />
                            )}
                            <span className="text-[10px] font-medium text-muted-foreground">
                                {isAiPaused ? "Humano (Pausado)" : "IA Ativa"}
                            </span>
                        </div>
                        <div className="cursor-default flex items-center">
                            <Switch
                                checked={isAiPaused}
                                onCheckedChange={handleToggleAi}
                                className="scale-75 origin-right"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </KanbanItem>
    );
}

interface TaskColumnProps
    extends Omit<React.ComponentProps<typeof KanbanColumn>, "children"> {
    tasks: OpportunityWithLead[];
    onCardClick?: (opp: OpportunityWithLead) => void;
}

function TaskColumn({ value, tasks, onCardClick, ...props }: TaskColumnProps) {
    return (
        <KanbanColumn
            value={value}
            className="bg-muted/30 p-2 rounded-lg border border-transparent hover:border-border/50 transition-colors"
            {...props}
        >
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{COLUMN_TITLES[value]}</span>
                    <Badge variant="secondary" className="pointer-events-none rounded-sm">
                        {tasks.length}
                    </Badge>
                </div>
                <KanbanColumnHandle asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <GripVertical className="h-4 w-4" />
                    </Button>
                </KanbanColumnHandle>
            </div>
            <div className="flex flex-col gap-2 p-0.5 min-h-[50px]">
                {tasks.map((task) => (
                    <OpportunityCard key={task.id} opp={task} asHandle onClick={() => onCardClick && onCardClick(task)} />
                ))}
            </div>
        </KanbanColumn>
    );
}
