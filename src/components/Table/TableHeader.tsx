"use client";

import { useState } from "react";
import { TableOrderDirection } from ".";
import { twMerge } from "tailwind-merge";

export interface TableColumn {
  key: string;
  label: string;
  type?: "text" | "date" | "money" | "percent" | undefined;
}

interface TableHeaderProps {
  columns: TableColumn[];
  isSelectable?: boolean;
  isEditable?: boolean;
  onOrder?: (
    columnKey: string,
    direction: TableOrderDirection
  ) => Promise<any[]>;
}

export function TableHeader({
  columns,
  isSelectable,
  isEditable,
  onOrder,
}: TableHeaderProps) {
  const [ColumnKey, setColumnKey] = useState(columns[0].key);
  const [Direction, setDirection] = useState<TableOrderDirection>("asc");

  async function handleOnOrder(columnKey: string) {
    const newDirection =
      columnKey !== ColumnKey ? "asc" : Direction === "asc" ? "desc" : "asc";

    setDirection(newDirection);
    setColumnKey(columnKey);

    if (typeof onOrder !== "undefined") {
      await onOrder(columnKey, newDirection);
    }
  }

  return (
    <thead>
      <tr className="bg-slate-200 ">
        {isSelectable && <th className="w-0"></th>}

        {columns.map((col) => (
          <th
            key={col.key}
            onClick={() => handleOnOrder(col.key)}
            className={twMerge(
              "p-2 text-start text-sm",
              isSelectable && "cursor-pointer",
              (col.type === "money" || col.type === "percent") && "text-end"
            )}
          >
            {col.label}

            {/* {Direction === "asc" && <FaChevronDown />}
            {Direction === "desc" && <FaChevronUp />} */}
          </th>
        ))}

        {isEditable && <th className="w-0"></th>}
      </tr>
    </thead>
  );
}
