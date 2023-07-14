"use client";

import { useState } from "react";
import { TableOrderDirection } from ".";

export interface TableColumn {
  key: string;
  label: string;
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
      <tr className="">
        {isSelectable && <th className="border border-slate-600"></th>}
        {columns.map((col) => (
          <th
            key={col.key}
            onClick={() => handleOnOrder(col.key)}
            className="cursor-pointer border border-slate-600"
          >
            {col.label}

            {/* {Direction === "asc" && <FaChevronDown />}
            {Direction === "desc" && <FaChevronUp />} */}
          </th>
        ))}
        {isEditable && <th className="border border-slate-600"></th>}
      </tr>
    </thead>
  );
}
