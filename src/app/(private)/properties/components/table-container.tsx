import { getProperties } from "../actions";
import { columns } from "./table/table-columns";
import { PropertiesDataTable } from "./table/properties-data-table";
import { DynamicPagination } from "./dynamic-pagination";

interface TableContainerProps {
    query?: string;
    page: string;
}

export async function TableContainer({ query, page }: TableContainerProps) {
    const result = await getProperties({
        limit: "10",
        page: String(page || 1),
        query,
    });

    const data = result?.data;

    if (!data?.success || !data.data) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-red-500">
                <p className="text-sm">
                    {data?.serverError || "Erro ao carregar imóveis. Tente novamente."}
                </p>
            </div>
        );
    }

    const { properties, totalPages, currentPage } = data.data;

    return (
        <div className="space-y-4">
            <PropertiesDataTable columns={columns} data={properties} />
            <DynamicPagination
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
}
