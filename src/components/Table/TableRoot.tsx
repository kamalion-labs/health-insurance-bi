"use client";

import { ReactNode } from "react";
import { TableColumn } from "./TableHeader";
import { Table, TableOrderDirection } from ".";

interface TableRootProps {
  children?: ReactNode;
  columns?: TableColumn[];
  data?: any[];
  selected?: any;
  onQuery?: (
    page: number,
    orderBy: string,
    orderDirection: TableOrderDirection
  ) => any;
  onSelect?: (item: any) => Promise<void>;
  onEdit?: (item: any) => Promise<void>;
}

export function TableRoot({
  columns,
  children,
  data,
  selected,
  onQuery,
  onSelect,
  onEdit,
}: TableRootProps) {
  return (
    <table className="table-auto border-collapse border border-slate-600">
      {!children && (
        <>
          {columns && data && (
            <>
              <Table.Header
                columns={columns}
                isSelectable={typeof onSelect !== "undefined"}
                isEditable={typeof onEdit !== "undefined"}
              />
              <Table.Content
                columns={columns}
                data={data}
                onSelect={onSelect}
                onEdit={onEdit}
                selected={selected}
              />
            </>
          )}
        </>
      )}

      {children}
    </table>
  );
}
