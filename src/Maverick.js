import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./Maverick.css";

function Basic(props) {
  const [myFiles, setMyFiles] = useState([]);

  function removeDuplicates(array, key) {
    return array.reduce((accumulator, element) => {
      if (!accumulator.find(el => el[key] === element[key])) {
        accumulator.push(element);
      }
      return accumulator;
    }, []);
  }

  const onDropAccepted = useCallback(acceptedFiles => {
    if (myFiles.length) {
      let copy = [...myFiles, ...acceptedFiles];
      let final = removeDuplicates(copy, "name");
      //   console.log("new copy", final);
      setMyFiles(final);
    } else {
      setMyFiles([...myFiles, ...acceptedFiles]);
    }
  });

  const options = {
    noKeyboard: true,
    onDropAccepted: onDropAccepted,
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

  const rejects = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  console.log(myFiles);
  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Accepted Files</h4>
        <ul>{files.sort((a, b) => a.name - b.name)}</ul>
        <h4>Rejected Files</h4>
        <ul>{rejects.sort((a, b) => a.name - b.name)}</ul>
      </aside>
      {files.length > 0 && <button onClick={removeAll}>Remove All</button>}
    </section>
  );
}

export default Basic;
