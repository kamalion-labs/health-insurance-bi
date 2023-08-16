"use client";

import { ReactNode, useState } from "react";
import { TableColumn } from "./TableHeader";
import { Table, TableOrderDirection } from ".";
import { Button } from "../Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data!.length / itemsPerPage); // Arredondamento p/ cima
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
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
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

      {usePagination && data!.length > itemsPerPage ? (
        <div className="flex justify-center gap-3">
          <Button.Root
            type="neutral"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            paginationButton
          >
            <Button.Icon>
              <FaChevronLeft />
            </Button.Icon>
          </Button.Root>

          <Button.Root
            type="neutral"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            paginationButton
          >
            <Button.Content>1</Button.Content>
          </Button.Root>

          <div className="flex justify-center gap-3">
            {currentPage === totalPages || currentPage === 1 ? (
              <div className="w-4"></div>
            ) : (
              <>...</>
            )}
            <Button.Root type="neutral" paginationButton>
              <Button.Content>{currentPage}</Button.Content>
            </Button.Root>
            {currentPage === totalPages || currentPage === 1 ? (
              <div className="w-4"></div>
            ) : (
              <>...</>
            )}
          </div>

          <Button.Root
            type="neutral"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            paginationButton
          >
            <Button.Content>{totalPages}</Button.Content>
          </Button.Root>

          <Button.Root
            type="neutral"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              (currentPage - 1) * itemsPerPage + itemsPerPage >= data!.length
            }
            paginationButton
          >
            <Button.Icon>
              <FaChevronRight />
            </Button.Icon>
          </Button.Root>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
