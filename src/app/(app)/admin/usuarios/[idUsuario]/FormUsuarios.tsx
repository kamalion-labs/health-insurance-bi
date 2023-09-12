"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Form, Input } from "@kamalion/ui";
import { Usuario } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { FaFloppyDisk, FaKey, FaTrash } from "react-icons/fa6";
import { z } from "zod";

const formSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
  email: z.string().nonempty("Campo obrigatório").email("E-mail inválido"),
  admin: z.string().nonempty("Campo obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

export function FormUsuarios({
  usuario,
}: {
  usuario: Omit<Usuario, "senha"> | undefined;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...usuario, admin: usuario?.admin.toString() } ?? { nome: "", email: "", admin: "false" },
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
      <Box.Header>Dados do Usuário</Box.Header>

      <Box.Content>
        <FormProvider {...form}>
        <Form.Root
          onSubmit={form.handleSubmit(handleSave)}
          className="flex flex-col space-y-3"
        >
          <Input.Root>
            <Input.Label htmlFor="nome">Nome:</Input.Label>
            <Input.Text {...form.register("nome")} />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="email">E-mail:</Input.Label>
            <Input.Text {...form.register("email")} />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="admin">Administrador:</Input.Label>
            <Input.Select {...form.register("admin")}>
              <Input.SelectItem value="false">Não</Input.SelectItem>
              <Input.SelectItem value="true">Sim</Input.SelectItem>
            </Input.Select>
          </Input.Root>

          <Form.Error />

          <div className="flex space-x-3">
            <Button.Root variant="success" type="submit">
              <Button.Icon>
                <FaFloppyDisk />
              </Button.Icon>

              <Button.Content>Salvar</Button.Content>
            </Button.Root>

            {usuario && (
              <>
                <Button.Root variant="danger" onClick={handleDelete}>
                  <Button.Icon>
                    <FaTrash />
                  </Button.Icon>

                  <Button.Content>Deletar</Button.Content>
                </Button.Root>

                <Button.Root onClick={handleNovaSenha}>
                  <Button.Icon>
                    <FaKey />
                  </Button.Icon>

                  <Button.Content>Enviar Nova Senha</Button.Content>
                </Button.Root>
              </>
            )}
          </div>
        </Form.Root>
        </FormProvider>
      </Box.Content>
    </Box.Root>
  );
}
