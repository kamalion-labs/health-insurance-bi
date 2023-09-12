"use client";

import { Table } from "@/components";
import { Box, Button } from "@kamalion/ui";
import { Usuario } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

const columns = [
  {
    key: "nome",
    label: "Nome",
  },
];

export function Lista({ usuarios }: { usuarios: Omit<Usuario, "senha">[] }) {
  const router = useRouter();

  return (
    <Box.Root>
      <Box.Header>Lista de Usuários</Box.Header>

      <Box.Content className="space-y-3">
        <div>
          <Link href="/admin/usuarios/add">
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
          data={usuarios}
          onEdit={(item: Usuario) => router.push(`/admin/usuarios/${item.id}`)}
        />
      </Box.Content>
    </Box.Root>
  );
}
