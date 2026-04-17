import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "../../utils/constants.jsx";
import Output from "./Output.jsx";

const Code = () => {
  //to store the code of the editor
  const [value, setValue] = useState("");

  //on Mount focus
  const editorRef = useRef();
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  //What will be current language of the editor.
  const [language, setLanguage] = useState("javascript");

  //useEffect runs whenever language changes => get different poilerplate code
  useEffect(() => {
    setValue(CODE_SNIPPETS[language]);
  }, [language]);

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] rounded-xl border border-[#2a2a2a] overflow-hidden font-mono">
      {/* TOP BAR */}
      <LanguageSelector language={language} setLanguage={setLanguage} />
      {/* SPLIT PANE */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* LEFT — Code Input */}
        <div className="flex flex-col h-[70%] border-r border-[#2a2a2a]">
          <div className="px-4 py-1.5 bg-[#141414] border-b border-[#2a2a2a]">
            <span className="text-[11px] text-[#555]">Input</span>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden ">
            {/* Textarea */}
            <Editor
              theme="vs-dark"
              height="75vh"
              // defaultLanguage="javascript" Now we are dynamically choosing language with drop down
              language={language}
              defaultValue="// some comment"
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
              options={{
                lineNumbersMinChars: 1,
                glyphMargin: false,
                lineDecorationsWidth: 0,
                padding: { left: 0 },
                overviewRulerLanes: 0,
              }}
            />
          </div>
        </div>

        {/* RIGHT — Output */}
        <Output value={value} language={language} />
      </div>
    </div>
  );
};

export default Code;
