import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./Maverick.css";

function Basic(props) {
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...myFiles, ...acceptedFiles]);
  });

  const options = {
    onDrop: onDrop,
    multiple: true,
    accept: "image/*"
  };

  const { rejectedFiles, getRootProps, getInputProps } = useDropzone(options);

  const removeFile = file => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const removeAll = () => {
    setMyFiles([]);
  };

  const files = myFiles.map(file => (
    <li key={file.path}>
      {file.path} / {file.size} bytes{" "}
      <button onClick={removeFile(file)}>Remove File</button>
    </li>
  ));

  const rejectedItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Accepted Files</h4>
        <ul>{files}</ul>
        <h4>Rejected Files</h4>
        <ul>{rejectedItems}</ul>
      </aside>
      {files.length > 0 && <button onClick={removeAll}>Remove All</button>}
    </section>
  );
}

export default Basic;
