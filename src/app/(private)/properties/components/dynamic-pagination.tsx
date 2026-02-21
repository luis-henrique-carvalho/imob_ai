"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from "@tabler/icons-react";

interface DynamicPaginationProps {
    currentPage: number;
    totalPages: number;
}

export function DynamicPagination({
    currentPage,
    totalPages,
}: DynamicPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goToPage = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(page));
            router.push(`${pathname}?${params.toString()}`);
        },
        [router, pathname, searchParams]
    );

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
                Página {currentPage} de {totalPages}
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => goToPage(1)}
                    disabled={currentPage <= 1}
                >
                    <IconChevronsLeft className="size-4" />
                    <span className="sr-only">Primeira página</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    <IconChevronLeft className="size-4" />
                    <span className="sr-only">Página anterior</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    <IconChevronRight className="size-4" />
                    <span className="sr-only">Próxima página</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage >= totalPages}
                >
                    <IconChevronsRight className="size-4" />
                    <span className="sr-only">Última página</span>
                </Button>
            </div>
        </div>
    );
}
