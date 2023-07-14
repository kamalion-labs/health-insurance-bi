import clsx from "clsx";
import { TableColumn } from "./TableHeader";
import { FaPencil } from "react-icons/fa6";
import { Button } from "../Button";

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
          className={clsx("cursor-pointer hover:bg-alt")}
          onClick={() => handleOnSelect(item)}
        >
          {typeof onSelect !== "undefined" && (
            <td className="border border-slate-600 px-2 py-1 pb-2">
              <input type="checkbox" checked={item === selected} readOnly />
            </td>
          )}

          {columns.map((column) => (
            <td
              key={column.key}
              className="content-center border border-slate-600 px-2 py-1"
            >
              {item[column.key]}
            </td>
          ))}

          {typeof onEdit !== "undefined" && (
            <td className="border border-slate-600 px-2 py-1 pb-2">
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
