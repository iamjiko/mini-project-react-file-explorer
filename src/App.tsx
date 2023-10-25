import React from "react";
import "./App.css";
import FileExplorer from "./components/fileExplorer/FileExplorer";
import { Files } from "./assets/files";

function App() {
  return (
    <div className="App">
      <div className="file-explorer-container">
        <FileExplorer rootFile={Files} />
      </div>
    </div>
  );
}

export default App;
