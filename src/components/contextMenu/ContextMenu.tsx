import React, { useState, useEffect, useCallback } from "react";

const ContextMenu = ({ onCopy, onDelete, onRename, x, y, visible, file }) => {
  // Use local state to manage the visibility
  const [isVisible, setIsVisible] = useState(false);

  // Set up a timer to delay the context menu appearance
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setIsVisible(true);
        setPosition(x, y);
      }, 100);
    } else {
      setIsVisible(false);
    }
  }, [x, y, visible]);

  // Prevent the default context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  // Function to set the position of the context menu
  const setPosition = (x, y) => {
    const menu = document.getElementById("context-menu");
    console.log("menu style");
    if (menu) {
      menu.style.left = x + "px";
      menu.style.top = y + "px";
    }
  };

  // Function to handle the "Copy" action
  const handleCopy = useCallback(
    (event) => {
      onCopy(event, file);
      setIsVisible(false);
    },
    [file, onCopy]
  );

  // Function to handle the "Delete" action
  const handleDelete = useCallback(
    (event) => {
      onDelete(event, file);
      setIsVisible(false);
    },
    [file, onDelete]
  );

  // Function to handle the "Rename" action
  const handleRename = useCallback(
    (event) => {
      onRename(event, file);
      setIsVisible(false);
    },
    [file, onRename]
  );

  // Conditionally render the context menu based on the visibility state
  return isVisible ? (
    <div
      id="context-menu"
      onContextMenu={handleContextMenu}
      className="context-menu"
    >
      <ul>
        <li onClick={handleCopy}>Copy</li>
        <li onClick={handleDelete}>Delete</li>
        <li onClick={handleRename}>Rename</li>
      </ul>
    </div>
  ) : null;
};

export default ContextMenu;
