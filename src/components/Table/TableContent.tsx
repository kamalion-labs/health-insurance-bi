"use client";

import { TableColumn } from "./TableHeader";
import { FaPencil } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { Money } from "../Money";
import { format } from "date-fns";
import { Button } from "@kamalion/ui";

interface TableContentProps {
  columns: TableColumn[];
  data: any[];
  selected?: any;
  onSelect?: (item: any) => Promise<void>;
  onEdit?: (item: any) => any | Promise<any>;
}

export function TableContent({
  columns,
  data,
  selected,
  onSelect,
  onEdit,
}: TableContentProps) {
  async function handleOnSelect(item: any) {
    if (typeof onSelect !== "undefined") {
      await onSelect(item);
    }
  }

  async function handleOnEdit(item: any) {
    if (typeof onEdit !== "undefined") {
      await onEdit(item);
    }
  }

  return (
    <tbody>
      {data.map((item, idx) => (
        <tr
          key={idx}
          className={twMerge(
            "h-[40px] rounded-md bg-slate-100 transition-all",
            onSelect && "cursor-pointer hover:bg-slate-300"
          )}
          onClick={() => handleOnSelect(item)}
        >
          {typeof onSelect !== "undefined" && (
            <td className="px-2 pt-0 first:rounded-l-md">
              <input type="checkbox" checked={item === selected} readOnly />
            </td>
          )}

          {columns.map((column) => {
            const val = column.key.includes(".")
              ? item[column.key.split(".")[0]][column.key.split(".")[1]]
              : item[column.key];

            return (
              <td
                key={column.key}
                className={twMerge(
                  "content-center px-2 text-start text-sm first:rounded-l-md last:rounded-r-md",
                  (column.type === "money" || column.type === "percent") &&
                    "text-end"
                )}
              >
                {column.type === "money" || column.type === "percent" ? (
                  <Money value={+val} percent={column.type === "percent"} />
                ) : (
                  <>
                    {column.type === "date" && val
                      ? format(new Date(val), "dd/MM/yyyy")
                      : val}
                  </>
                )}
              </td>
            );
          })}

          {typeof onEdit !== "undefined" && (
            <td className="px-2 py-1 last:rounded-r-md">
              <Button.Root
                variant="accent"
                size="icon"
                onClick={() => handleOnEdit(item)}
              >
                <Button.Icon>
                  <FaPencil />
                </Button.Icon>
              </Button.Root>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
