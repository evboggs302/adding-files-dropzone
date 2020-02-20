import React from "react";
import { useDropzone } from "react-dropzone";
import "./Maverick.css";

function Accept(props) {
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    multiple: true,
    accept: "image/jpeg, image/png"
  });

  const acceptedItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
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
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
        <input {...getInputProps()} />
      </div>
      <br />
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedItems}</ul>
        <h4>Rejected files</h4>
        <ul>{rejectedItems}</ul>
      </aside>
    </section>
  );
}

export default Accept;
