import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNotes } from "../utils/notesSlice";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Notes = () => {
  const dispatch = useDispatch();
  const savedContent = useSelector((store) => store.notes.content);
  const editorRef = useRef(null);

  // create editor with saved content
  const editor = useCreateBlockNote({
    initialContent: savedContent.length > 0 ? savedContent : undefined,
  });

  // autosave whenever content changes
  const handleChange = () => {
    dispatch(saveNotes(editor.document));
  };

  const exportToPDF = async () => {
    const editorEl = editorRef.current;
    if (!editorEl) return;

    const canvas = await html2canvas(editorEl, {
      scale: 2,
      backgroundColor: "#1a1a1a",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width / 2, canvas.height / 2],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save("notes.pdf");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 shrink-0">
        <span className="text-sm text-gray-400 font-semibold">My Notes</span>
        <button
          onClick={exportToPDF}
          className="px-3 py-1.5 bg-[#272727] hover:bg-[#3f3f3f] text-white text-xs rounded-lg border border-gray-600 transition cursor-pointer"
        >
          Export PDF
        </button>
      </div>

      {/* Editor */}
      <div ref={editorRef} className="flex-1 overflow-y-auto scrollbar-hide">
        <BlockNoteView editor={editor} onChange={handleChange} theme="dark" />
      </div>
    </div>
  );
};

export default Notes;
