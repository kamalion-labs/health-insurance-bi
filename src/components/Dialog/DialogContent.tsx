import { Fragment, ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Transition } from "@headlessui/react";
import { FaXmark } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
}

export function DialogContent({ children }: Props) {
  return (
    <DialogPrimitive.Portal>
      <Transition.Root show={true}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay className="fixed inset-0 z-20 bg-black/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            className={twMerge(
              "fixed z-50",
              "h-full w-full",
              "left-0 top-0 flex items-center justify-center"
            )}
          >
            <div
              className={twMerge(
                "relative w-[95vw] max-w-md rounded-lg bg-white p-4 md:w-full",
                "focus:outline-none focus-visible:ring focus-visible:ring-zinc-500 focus-visible:ring-opacity-75"
              )}
            >
              {children}

              <DialogPrimitive.Close
                className={twMerge(
                  "absolute right-3.5 top-3.5 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-zinc-500 focus-visible:ring-opacity-75"
                )}
              >
                <FaXmark className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </DialogPrimitive.Close>
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
