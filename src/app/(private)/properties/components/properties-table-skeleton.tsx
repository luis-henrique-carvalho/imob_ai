import { Skeleton } from "@/components/ui/skeleton";

export function PropertiesTableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <div className="border-b px-4 py-3 bg-muted/50">
                    <div className="grid grid-cols-4 gap-4">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[80px]" />
                        <Skeleton className="h-4 w-[60px] justify-self-end" />
                    </div>
                </div>
                <div className="divide-y">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="px-4 py-4 grid grid-cols-4 gap-4 items-center">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-6 w-[70px] rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-md justify-self-end" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-[120px]" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </div>
        </div>
    );
}
