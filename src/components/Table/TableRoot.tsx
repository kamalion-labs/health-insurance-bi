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
}

export function TableRoot({
  columns,
  children,
  data,
  selected,
  onQuery,
  onSelect,
}: TableRootProps) {
  return (
    <table>
      {!children && (
        <>
          {columns && data && (
            <>
              <Table.Header
                columns={columns}
                isSelectable={typeof onSelect !== "undefined"}
              />
              <Table.Content
                columns={columns}
                data={data}
                onSelect={onSelect}
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
