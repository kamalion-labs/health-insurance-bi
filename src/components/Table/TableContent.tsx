import clsx from "clsx";
import { TableColumn } from "./TableHeader";
import { FaSquare, FaSquareCheck } from "react-icons/fa6";

interface TableContentProps {
  columns: TableColumn[];
  data: any[];
  selected?: any;
  onSelect?: (item: any) => Promise<void>;
}

export function TableContent({
  columns,
  data,
  selected,
  onSelect,
}: TableContentProps) {
  async function handleOnSelect(item: any) {
    if (typeof onSelect !== "undefined") {
      await onSelect(item);
    }
  }

  return (
    <tbody>
      {data.map((item, idx) => (
        <tr
          key={idx}
          className={clsx("cursor-pointer hover:bg-main")}
          onClick={() => handleOnSelect(item)}
        >
          {typeof onSelect !== "undefined" && (
            <td>
              {item === selected ? (
                <FaSquareCheck className="text-primary" />
              ) : (
                <FaSquare className="" />
              )}
            </td>
          )}

          {columns.map((column) => (
            <td key={column.key} className="px-2 py-1">
              {item[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
