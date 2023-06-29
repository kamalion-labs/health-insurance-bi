"use client";

import { Button, Page, PageInitializer } from "@/components";
import clsx from "clsx";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FaFileLines } from "react-icons/fa6";
// import { ProgressBar } from "@/components/ProgressBar";

export default function ImportacaoPage() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<FileList>();
  // const [UploadProgress, setUploadProgress] = useState<number>();
  // const [ImportProgress, setImportProgress] = useState<any>();

  function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    if (!files) {
      return;
    }

    setFiles(files);
  }

  async function upload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!files) {
      alert("Please, select file you want to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      // await axios("/api/importFile", {
      //   method: "POST",
      //   data: formData,
      //   onUploadProgress: (e) => {
      //     setUploadProgress(e.progress! * 100);
      //   },
      // });

      fetch("/api/importFile", {
        method: "POST",
        body: formData,
      });

      alert("Importado com sucesso");
      setFiles(undefined);

      // await importFile(res.data.path);
      // handle the error
      // if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  }

  // async function importFile(filePath: string) {
  //   const eventSource = new EventSource(`/api/import?path=${filePath}`);

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data.replace(/\\n/g, "\n").trim());

  //     setImportProgress(data);

  //     if (data.progress === 100) {
  //       eventSource.close();
  //     }
  //   };
  // }

  return (
    <div className="p-4">
      <PageInitializer id={"importacao"} title={"Importação de Arquivos"} />

      <form onSubmit={upload} className="rounded bg-alt p-4">
        {!files && (
          <>
            <label
              htmlFor="media"
              className={clsx(
                "flex h-20 flex-col items-center justify-center rounded border border-slate-500 bg-main",
                "cursor-pointer hover:opacity-70",
                "transition-opacity"
              )}
            >
              <FaFileLines />
              Selecione um arquivo...
            </label>

            <input
              type="file"
              id="media"
              name="coverUrl"
              className="invisible h-0 w-0"
              onChange={onFileSelected}
              ref={inputFileRef}
            />
          </>
        )}

        {files && (
          <div className="flex flex-col space-y-5">
            <div className="flex items-center space-x-5">
              <FaFileLines size={30} />
              <div className="flex flex-col">
                <span>{files[0].name}</span>

                <span>
                  {(
                    files[0].size / (files[0].size > 1e6 ? 1024 * 1024 : 1024)
                  ).toFixed(2)}
                  {files[0].size > 1e6 ? "mb" : "kb"}
                </span>

                {/* <ProgressBar progress={UploadProgress} /> */}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button submit>Importar</Button>
              <Button type="secondary" onClick={() => setFiles(undefined)}>
                Selecionar outro arquivo
              </Button>
            </div>

            {/* {ImportProgress && (
              <div>
                <ProgressBar progress={ImportProgress.progress} />
                <div>Status: {ImportProgress.status}</div>
              </div>
            )} */}
          </div>
        )}
      </form>
    </div>
  );
}
