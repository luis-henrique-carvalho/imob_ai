"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { deleteProperty } from "../../actions";
import UpsertPropertyForm from "../upsert-property-form";
import type { Property } from "../../types/property";

interface TableActionsProps {
    entity: Property;
}

export function TableActions({ entity }: TableActionsProps) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const deleteAction = useAction(deleteProperty, {
        onSuccess: ({ data }) => {
            if (!data?.success) {
                toast.error(data?.serverError || "Erro ao excluir");
                return;
            }
            toast.success("Imóvel excluído com sucesso!");
            setDeleteOpen(false);
        },
        onError: () => {
            toast.error("Erro ao excluir imóvel.");
        },
    });

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <IconDotsVertical />
                        <span className="sr-only">Abrir menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                        <IconPencil className="mr-2 size-4" />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onSelect={() => setDeleteOpen(true)}
                    >
                        <IconTrash className="mr-2 size-4" />
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Edit Dialog — form now includes DialogContent */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <UpsertPropertyForm
                    property={entity}
                    isOpen={editOpen}
                    onSuccess={() => setEditOpen(false)}
                />
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Excluir Imóvel</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja excluir &quot;{entity.title}&quot;? Esta
                            ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            disabled={deleteAction.status === "executing"}
                            onClick={() => deleteAction.execute({ id: entity.id })}
                        >
                            {deleteAction.status === "executing" ? "Excluindo..." : "Excluir"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
