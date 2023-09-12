"use client";

import { Table } from "@/components";
import { TableColumn } from "@/components/Table/TableHeader";
import { Box, Button } from "@kamalion/ui";
import { Empresa, Usuario } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

const columns: TableColumn[] = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "CNPJ",
    label: "CNPJ"
  },
  {
    key: "numeroContrato",
    label: "Numero Contrato"
  },
  {
    key: "inicioContrato",
    label: "Inicio Contrato",
    type: "date"
  },
  {
    key: "fimContrato",
    label: "Fim Contrato",
    type: "date"
  },
];

export function Lista({ empresas }: { empresas: Empresa[] }) {
  const router = useRouter();

  return (
    <Box.Root>
      <Box.Header>Lista de Empresas</Box.Header>

      <Box.Content className="space-y-3">
        <div>
          <Link href="/admin/empresas/add">
            <Button.Root variant="success">
              <Button.Icon>
                <FaPlus />
              </Button.Icon>

              <Button.Content>Adicionar</Button.Content>
            </Button.Root>
          </Link>
        </div>

        <Table.Root
          columns={columns}
          data={empresas}
          onEdit={(item: Empresa) => router.push(`/admin/empresas/${item.id}`)}
        />
      </Box.Content>
    </Box.Root>
  );
}
