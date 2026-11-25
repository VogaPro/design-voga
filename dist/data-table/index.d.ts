import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
export { ColumnDef } from '@tanstack/react-table';

/**
 * Tabela de dados: ordenação, busca e paginação. O `@tanstack/react-table`
 * entra como peer OPCIONAL — só quem importa `@voga/ui/data-table` instala.
 */
interface DataTableProps<T> {
    columns: ColumnDef<T, unknown>[];
    data: T[];
    /** Mostra o campo de busca e filtra por esta coluna. */
    searchColumn?: string;
    searchPlaceholder?: string;
    /** 0 desliga a paginação. */
    pageSize?: number;
    emptyTitle?: string;
    emptyDesc?: string;
}
declare function DataTable<T>({ columns, data, searchColumn, searchPlaceholder, pageSize, emptyTitle, emptyDesc, }: DataTableProps<T>): React.JSX.Element;

export { DataTable, type DataTableProps };
