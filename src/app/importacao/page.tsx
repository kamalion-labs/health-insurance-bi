"use client";

import { Button } from "@/components";
import { usePage } from "@/hooks";
import clsx from "clsx";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FaFileLines } from "react-icons/fa6";
// import { ProgressBar } from "@/components/ProgressBar";

export default function ImportacaoPage() {
  usePage({ id: "importacao", title: "Importação de Arquivos" });

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File>();
  // const [UploadProgress, setUploadProgress] = useState<number>();
  // const [ImportProgress, setImportProgress] = useState<any>();

  function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    if (!files) {
      return;
    }

    setFile(files[0]);
  }

  async function upload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputFileRef.current?.files?.length) {
      alert("Please, select file you want to upload");
      return;
    }

    try {
      const formData = new FormData();

      Object.values(inputFileRef.current.files).forEach((file) => {
        formData.append("file", file);
      });

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
        next: { tags: ["competencias"] },
      });

      alert("Importado com sucesso");

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
      <form onSubmit={upload} className="rounded bg-alt p-4">
        {!file && (
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

        {file && (
          <div className="flex flex-col space-y-5">
            <div className="flex items-center space-x-5">
              <FaFileLines size={30} />
              <div className="flex flex-col">
                <span>{file.name}</span>

                <span>
                  {(file.size / (file.size > 1e6 ? 1024 * 1024 : 1024)).toFixed(
                    2
                  )}
                  {file.size > 1e6 ? "mb" : "kb"}
                </span>

                {/* <ProgressBar progress={UploadProgress} /> */}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button submit>Importar</Button>
              <Button type="secondary" onClick={() => setFile(undefined)}>
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
