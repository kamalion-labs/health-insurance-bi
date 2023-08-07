"use client";

import { Box, Button, Input, Select } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Usuario } from "@prisma/client";
import { useForm } from "react-hook-form";
import { FaFloppyDisk, FaKey, FaTrash } from "react-icons/fa6";
import { z } from "zod";

const formSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
  email: z.string().nonempty("Campo obrigatório").email("E-mail inválido"),
  admin: z.enum(["true", "false"]).transform((val) => val === "true"),
});

type FormData = z.infer<typeof formSchema>;

export function FormUsuarios({
  usuario,
}: {
  usuario: Omit<Usuario, "senha"> | undefined;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: usuario ?? { nome: "", email: "", admin: false },
  });

  async function handleSave(formData: FormData) {
    const url = usuario ? `/api/usuario/${usuario.id}` : "/api/usuario";
    const method = usuario ? "PUT" : "POST";

    await fetch(url, {
      body: JSON.stringify(formData),
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function handleDelete() {
    if (usuario) {
      await fetch(`/api/usuario/${usuario.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  async function handleNovaSenha() {
    if (usuario) {
      await fetch(`/api/usuario/${usuario.id}/resetarSenha`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return (
    <Box.Root>
      <Box.Title>Dados do Usuário</Box.Title>

      <Box.Content>
        <form
          onSubmit={handleSubmit(handleSave)}
          className="flex flex-col space-y-3 px-4"
        >
          <Input.Root>
            <Input.Label htmlFor="nome" text="Nome:" />
            <Input.Control control={control} name="nome" />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="email" text="E-mail:" />
            <Input.Control control={control} name="email" />
          </Input.Root>

          <Select.Root>
            <Select.Label htmlFor="admin" text="Administrador:" />
            <Select.Control
              control={control}
              name="admin"
              data={[
                { key: false, label: "Não" },
                { key: true, label: "Sim" },
              ]}
            />
          </Select.Root>

          {errors.root?.message}

          <div className="flex space-x-3">
            <Button.Root type="success" submit>
              <Button.Icon>
                <FaFloppyDisk />
              </Button.Icon>

              <Button.Content>Salvar</Button.Content>
            </Button.Root>

            {usuario && (
              <>
                <Button.Root type="danger" onClick={handleDelete}>
                  <Button.Icon>
                    <FaTrash />
                  </Button.Icon>

                  <Button.Content>Deletar</Button.Content>
                </Button.Root>

                <Button.Root type="info" onClick={handleNovaSenha}>
                  <Button.Icon>
                    <FaKey />
                  </Button.Icon>

                  <Button.Content>Enviar Nova Senha</Button.Content>
                </Button.Root>
              </>
            )}
          </div>
        </form>
      </Box.Content>
    </Box.Root>
  );
}
