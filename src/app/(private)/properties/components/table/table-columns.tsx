"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TableActions } from "./table-actions";
import type { Property } from "../../types/property";

export const columns: ColumnDef<Property>[] = [
    {
        id: "title",
        header: "Título",
        accessorKey: "title",
        cell: ({ row }) => (
            <span className="font-medium">{row.original.title}</span>
        ),
    },
    {
        id: "price",
        header: "Preço",
        accessorKey: "price",
        cell: ({ row }) =>
            Number(row.original.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
    },
    {
        id: "isActive",
        header: "Status",
        accessorKey: "isActive",
        cell: ({ row }) => (
            <Badge variant={row.original.isActive ? "default" : "secondary"}>
                {row.original.isActive ? "Ativo" : "Inativo"}
            </Badge>
        ),
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => <TableActions entity={row.original} />,
    },
];
