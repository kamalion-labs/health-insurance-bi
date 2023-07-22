import { TableColumn } from "./TableHeader";
import { FaPencil } from "react-icons/fa6";
import { Button } from "../Button";
import { twMerge } from "tailwind-merge";
import { Money } from "../Money";
import { format } from "date-fns";

interface TableContentProps {
  columns: TableColumn[];
  data: any[];
  selected?: any;
  onSelect?: (item: any) => Promise<void>;
  onEdit?: (item: any) => Promise<void>;
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
            "even:bg-slate-100",
            onSelect && "cursor-pointer hover:bg-alt"
          )}
          onClick={() => handleOnSelect(item)}
        >
          {typeof onSelect !== "undefined" && (
            <td className="px-2 py-1">
              <input type="checkbox" checked={item === selected} readOnly />
            </td>
          )}

          {columns.map((column) => (
            <td
              key={column.key}
              className={twMerge(
                "content-center px-2 py-1 text-start text-sm",
                (column.type === "money" || column.type === "percent") &&
                  "text-end"
              )}
            >
              {column.type === "money" || column.type === "percent" ? (
                <Money
                  value={
                    column.key.includes(".")
                      ? +item[column.key.split(".")[0]][
                          column.key.split(".")[1]
                        ]
                      : +item[column.key]
                  }
                  percent={column.type === "percent"}
                />
              ) : (
                <>
                  {column.type === "date"
                    ? format(
                        new Date(
                          column.key.includes(".")
                            ? item[column.key.split(".")[0]][
                                column.key.split(".")[1]
                              ]
                            : item[column.key]
                        ),
                        "dd/MM/yyyy"
                      )
                    : column.key.includes(".")
                    ? item[column.key.split(".")[0]][column.key.split(".")[1]]
                    : item[column.key]}
                </>
              )}
            </td>
          ))}

          {typeof onEdit !== "undefined" && (
            <td className="px-2 py-1">
              <Button.Root onClick={() => handleOnEdit(item)}>
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
