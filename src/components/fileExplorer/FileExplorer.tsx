import React, { useState } from "react";
import "./fileExplorer.css";
import type { FileExplorerProps, File } from "./fileExplorer.types";
import ContextMenu from "../contextMenu/ContextMenu";

type FileIcons = Record<string, React.ReactNode>;
type FolderIcons = Record<string, React.ReactNode>;

const FolderDefault = () => (
  <img
    src="https://www.svgrepo.com/show/149190/folder.svg"
    alt="Folder SVG File"
    title="Folder SVG File"
    width="20"
    height="20"
  />
);

const FileDefault = ({ type = "", alt }) => {
  return (
    <img
      src="https://www.svgrepo.com/show/149192/jpg.svg"
      alt={alt}
      title="Jpg SVG File"
      width="20"
      height="20"
    ></img>
  );
};

const folderIcons: FolderIcons = {
  root: <FolderDefault />,
  src: <FolderDefault />,
  public: <FolderDefault />,
  data: <FolderDefault />,
  images: <FolderDefault />,
  default: <FolderDefault />, // Default image icon for unknown folder names
};

const fileIcons: FileIcons = {
  js: <FileDefault alt="JavaScript" />,
  ts: <FileDefault alt="TypeScript" />,
  html: <FileDefault alt="HTML" />,
  img: <FileDefault alt="Image File Type" />,
  svg: <FileDefault alt="SVG" />,
  default: <FileDefault alt="File" />, // Default icon for unknown file types
};

const FileExplorer: React.FC<FileExplorerProps> = ({
  rootFile,
  locale = "en-US",
  theme,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSelectedFile, setCurrentSelectedFile] = useState("");
  const onFileClick = function (file) {
    setCurrentSelectedFile((selectedItem) =>
      selectedItem == file.name ? "" : file.name
    );
  };
  const renderFile = (file: File) => {
    if (file.type === "folder") {
      const toggleExpanded = () => {
        setIsExpanded((prevExpanded) => !prevExpanded);
        setCurrentSelectedFile("");
      };

      return (
        <div className="folder">
          <section className="folder-title" onClick={toggleExpanded}>
            {folderIcons[file.name] || folderIcons.default}
            {file.name}
          </section>
          <section className="children-container">
            {isExpanded &&
              file.data &&
              file.data.map((item) => <FileExplorer rootFile={item} />)}
          </section>
        </div>
      );
    }

    return (
      <div
        className={
          currentSelectedFile == file.name ? "file-name active" : "file-name"
        }
        onContextMenu={(event) => handleContextMenu(event, file)}
        onClick={() => onFileClick(file)}
      >
        {fileIcons[file.name] || fileIcons.default}
        {file.name}
      </div>
    );
  };

  const [contextMenu, setContextMenu] = useState({
    x: 0,
    y: 0,
    visible: false,
    file: {},
  });

  const handleContextMenu = (e, file) => {
    e.preventDefault();
    console.log("coming here");
    setContextMenu({ x: e.clientX, y: e.clientY, visible: true, file });
  };

  const handleCopy = (event, file) => {
    console.log("Copy", file);
  };

  const handleDelete = (event, file) => {
    console.log("Delete", file);
  };

  const handleRename = (event, file) => {
    console.log("Rename", file);
  };

  return (
    <div className="file-explorer">
      {renderFile(rootFile)}
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        visible={contextMenu.visible}
        file={contextMenu.file}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onRename={handleRename}
      />
    </div>
  );
};

export default FileExplorer;
