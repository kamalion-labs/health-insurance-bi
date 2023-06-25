"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface PageContextProps {
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;

  pageId: string;
  setPageId: Dispatch<SetStateAction<string>>;

  parentId: string;
  setParentId: Dispatch<SetStateAction<string>>;
}

const PageContext = createContext<PageContextProps | null>(null);

export function PageProvider({ children }: { children: ReactNode }) {
  const [pageTitle, setPageTitle] = useState("");
  const [pageId, setPageId] = useState("");
  const [parentId, setParentId] = useState("");

  return (
    <PageContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        pageId,
        setPageId,
        parentId,
        setParentId,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage(params?: {
  title?: string;
  id?: string;
  parentId?: string;
}) {
  const context = useContext(PageContext);

  if (!context) throw new Error("usePage must be used inside a PageProvider");

  useEffect(() => {
    if (params?.title) context.setPageTitle(params.title);
  }, [context, params?.title]);

  useEffect(() => {
    if (params?.id) context.setPageId(params?.id);
  }, [context, params?.id]);

  useEffect(() => {
    if (params?.parentId) context.setParentId(params?.parentId);
  }, [context, params?.parentId]);

  return {
    pageTitle: context.pageTitle,
    setPageTitle: context.setPageTitle,
    pageId: context.pageId,
    setPageId: context.setPageId,
    parentId: context.parentId,
    setparentId: context.setParentId,
  };
}
