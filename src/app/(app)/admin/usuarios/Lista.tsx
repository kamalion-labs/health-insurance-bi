"use client";

import { Box, Button, Table } from "@/components";
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
      <Box.Title>Lista de Usuários</Box.Title>

      <Box.Content>
        <div className="pl-3">
          <Link href="/admin/usuarios/add">
            <Button.Root type="success">
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
