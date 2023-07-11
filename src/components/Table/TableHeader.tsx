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
  onOrder?: (
    columnKey: string,
    direction: TableOrderDirection
  ) => Promise<any[]>;
}

export function TableHeader({
  columns,
  isSelectable,
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
      <tr>
        {isSelectable && <th></th>}
        {columns.map((col) => (
          <th
            key={col.key}
            className="cursor-pointer"
            onClick={() => handleOnOrder(col.key)}
          >
            {col.label}

            {/* {Direction === "asc" && <FaChevronDown />}
            {Direction === "desc" && <FaChevronUp />} */}
          </th>
        ))}
      </tr>
    </thead>
  );
}
