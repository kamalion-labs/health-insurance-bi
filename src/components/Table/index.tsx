import { TableContent } from "./TableContent";
import { TableHeader } from "./TableHeader";
import { TableRoot } from "./TableRoot";

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Content: TableContent,
};

export type TableOrderDirection = "asc" | "desc";
