"use client";

import { Button, Select } from "@/components";
import { ArquivoOperadora } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ACCEPTED_TYPES = ["text/plain", "text/csv", "application/vnd.ms-excel"];

const fileFormSchema = z.object({
  idArquivo: z.coerce.number({
    invalid_type_error: "Campo obrigatório",
    required_error: "Campo obrigatório",
  }),
  arquivo: z
    .instanceof(FileList || File)
    .transform((files) => {
      if (files instanceof File) return files;
      return files[0];
    })
    .refine(
      (file) =>
        typeof file !== "undefined" && ACCEPTED_TYPES.includes(file.type),
      { message: "Selecione um arquivo do tipo .txt, .csv, .xls ou .xlsx." }
    ),
});

type FileFormData = z.infer<typeof fileFormSchema>;

export function ImportForm({ arquivos }: { arquivos: ArquivoOperadora[] }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FileFormData>({
    resolver: zodResolver(fileFormSchema),
  });

  async function upload(data: FileFormData) {
    try {
      const formData = new FormData();
      formData.append("file", data.arquivo);
      formData.append("idArquivo", data.idArquivo.toString());

      const result = await fetch("/api/importFile", {
        method: "POST",
        body: formData,
      });

      if (result.ok) {
        alert("Importado com sucesso");
        return;
      }

      const error = await result.text();

      console.log(error);
      alert(error);
    } catch (e: any) {
      console.error(e);
    }
  }

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit(upload)}
        className="space-y-5 rounded bg-alt p-4"
      >
        <Select.Root className="">
          <Select.Label htmlFor="idArquivo" text="Tipo de Arquivo:" />

          <Select.Control
            data={arquivos.map((arquivo) => ({
              key: arquivo.id.toString(),
              label: arquivo.nome,
            }))}
            name="idArquivo"
            control={control}
          />
        </Select.Root>

        <div className="flex flex-col">
          <label htmlFor="arquivo">Arquivo:</label>

          <input type="file" id="arquivo" {...register("arquivo")} />

          <div className="text-red-400">{errors?.arquivo?.message}</div>
        </div>

        <div className="flex space-x-3">
          <Button.Root submit>
            <Button.Content>Importar</Button.Content>
          </Button.Root>
        </div>
      </form>
    </div>
  );
}
