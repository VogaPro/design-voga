import { Input, TableWrap, Table, TableHead, TableRow, TableHeader, Icon, TableBody, TableCell, Empty, Pagination } from '../chunk-WJFEAZQV.js';
import '../chunk-7EOSDFS3.js';
import * as React from 'react';
import { useReactTable, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import { jsxs, jsx } from 'react/jsx-runtime';

function DataTable({
  columns,
  data,
  searchColumn,
  searchPlaceholder = "Buscar\u2026",
  pageSize = 10,
  emptyTitle = "Nada aqui ainda",
  emptyDesc
}) {
  const [sorting, setSorting] = React.useState([]);
  const [busca, setBusca] = React.useState("");
  const table = useReactTable({
    data,
    columns,
    state: { sorting, ...searchColumn ? { columnFilters: [{ id: searchColumn, value: busca }] } : {} },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...pageSize > 0 ? { getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize } } } : {}
  });
  const linhas = table.getRowModel().rows;
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "var(--voga-space-3)" }, children: [
    searchColumn ? /* @__PURE__ */ jsx(
      Input,
      {
        value: busca,
        onChange: (e) => setBusca(e.target.value),
        placeholder: searchPlaceholder,
        "aria-label": searchPlaceholder,
        style: { maxWidth: 280 }
      }
    ) : null,
    /* @__PURE__ */ jsxs(TableWrap, { children: [
      /* @__PURE__ */ jsxs(Table, { hover: true, children: [
        /* @__PURE__ */ jsx(TableHead, { children: table.getHeaderGroups().map((group) => /* @__PURE__ */ jsx(TableRow, { children: group.headers.map((header) => {
          const ordenavel = header.column.getCanSort();
          const dir = header.column.getIsSorted();
          return /* @__PURE__ */ jsx(TableHeader, { children: ordenavel ? /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: header.column.getToggleSortingHandler(),
              className: "voga-btn voga-btn--link",
              style: { font: "inherit", gap: 6 },
              children: [
                flexRender(header.column.columnDef.header, header.getContext()),
                /* @__PURE__ */ jsx(
                  Icon,
                  {
                    as: dir === "asc" ? ArrowUp : dir === "desc" ? ArrowDown : ChevronsUpDown,
                    style: { width: 14, height: 14 }
                  }
                )
              ]
            }
          ) : flexRender(header.column.columnDef.header, header.getContext()) }, header.id);
        }) }, group.id)) }),
        /* @__PURE__ */ jsx(TableBody, { children: linhas.map((row) => /* @__PURE__ */ jsx(TableRow, { "data-state": row.getIsSelected() ? "selected" : void 0, children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
      ] }),
      linhas.length === 0 ? /* @__PURE__ */ jsx(Empty, { size: "inline", title: emptyTitle, desc: emptyDesc }) : null
    ] }),
    pageSize > 0 && table.getPageCount() > 1 ? /* @__PURE__ */ jsx(
      Pagination,
      {
        page: table.getState().pagination.pageIndex + 1,
        pages: table.getPageCount(),
        onChange: (p) => table.setPageIndex(p - 1)
      }
    ) : null
  ] });
}

export { DataTable };
