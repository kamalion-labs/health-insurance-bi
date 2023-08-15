"use client";

import { ReactNode, useState } from "react";
import { TableColumn } from "./TableHeader";
import { Table, TableOrderDirection } from ".";
import { Button } from "../Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

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
  usePagination?: boolean;
}

export function TableRoot({
  columns,
  children,
  data,
  selected,
  onQuery,
  onSelect,
  onEdit,
  usePagination = true,
}: TableRootProps) {
  const itemPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col">
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
                    data={
                      usePagination
                        ? data.slice(
                            (currentPage - 1) * itemPerPage,
                            currentPage * itemPerPage
                          )
                        : data
                    }
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

      {usePagination ? (
        <div className="flex justify-center gap-3">
          <Button.Root
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Button.Icon>
              <FaArrowLeft />
            </Button.Icon>
          </Button.Root>

          <Button.Root
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              (currentPage - 1) * itemPerPage + itemPerPage >= data.length
            }
          >
            <Button.Icon>
              <FaArrowRight />
            </Button.Icon>
          </Button.Root>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
