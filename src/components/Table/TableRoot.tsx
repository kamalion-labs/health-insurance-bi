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
  onEdit?: (item: any) => any | Promise<any>;
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
    <div className="max-w-scren flex overflow-x-auto p-2">
      <table className="w-full table-auto border-separate border-spacing-y-2">
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
    </div>
  );
}
