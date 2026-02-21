"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

interface SearchInputProps {
    placeholder?: string;
}

export function SearchInput({ placeholder = "Buscar..." }: SearchInputProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = useCallback(
        (term: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (term) {
                params.set("query", term);
                params.delete("page");
            } else {
                params.delete("query");
            }
            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
            });
        },
        [router, pathname, searchParams]
    );

    return (
        <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                placeholder={placeholder}
                defaultValue={searchParams.get("query") ?? ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9"
            />
        </div>
    );
}
