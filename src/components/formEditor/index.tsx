import Quill from "quill";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { data } from "react-router-dom";

interface EditorProps {
  data?: string;
}

const EditorComponent: React.FC<EditorProps> = (props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ['24px'] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }],
      ["link", "image", "video"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  // const handleProcedureContentChange = (
  //   content: string,
  //   delta: any,
  //   source: string,
  //   editor: Quill
  // ): void => {
  //   setCode(content);
  // };

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={props.data}
      />
    </>
  );
};

export default EditorComponent;
