import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Empty } from "../components/empty";
import { Icon } from "../components/icon";
import { Input } from "../components/input";
import { Pagination } from "../components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrap,
} from "../components/table";

/**
 * Tabela de dados: ordenação, busca e paginação. O `@tanstack/react-table`
 * entra como peer OPCIONAL — só quem importa `@voga/ui/data-table` instala.
 */
export interface DataTableProps<T> {
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

export function DataTable<T>({
  columns,
  data,
  searchColumn,
  searchPlaceholder = "Buscar…",
  pageSize = 10,
  emptyTitle = "Nada aqui ainda",
  emptyDesc,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [busca, setBusca] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, ...(searchColumn ? { columnFilters: [{ id: searchColumn, value: busca }] } : {}) },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pageSize > 0
      ? { getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize } } }
      : {}),
  });

  const linhas = table.getRowModel().rows;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--voga-space-3)" }}>
      {searchColumn ? (
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          style={{ maxWidth: 280 }}
        />
      ) : null}

      <TableWrap>
        <Table hover>
          <TableHead>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => {
                  const ordenavel = header.column.getCanSort();
                  const dir = header.column.getIsSorted();
                  return (
                    <TableHeader key={header.id}>
                      {ordenavel ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="voga-btn voga-btn--link"
                          style={{ font: "inherit", gap: 6 }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <Icon
                            as={dir === "asc" ? ArrowUp : dir === "desc" ? ArrowDown : ChevronsUpDown}
                            style={{ width: 14, height: 14 }}
                          />
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHeader>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {linhas.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {linhas.length === 0 ? <Empty size="inline" title={emptyTitle} desc={emptyDesc} /> : null}
      </TableWrap>

      {pageSize > 0 && table.getPageCount() > 1 ? (
        <Pagination
          page={table.getState().pagination.pageIndex + 1}
          pages={table.getPageCount()}
          onChange={(p) => table.setPageIndex(p - 1)}
        />
      ) : null}
    </div>
  );
}

export type { ColumnDef };
