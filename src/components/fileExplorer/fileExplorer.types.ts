export type File = {
    type: "folder" | "file";
    name: string;
    data?: File[];
    meta?: string;
    expanded?: boolean;
  };


export type FileExplorerProps = {
    rootFile: File;
    locale?: string;
    theme?: Record<string, string>;
};