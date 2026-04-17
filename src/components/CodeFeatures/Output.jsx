import React, { useState } from "react";
import { executeCode } from "./api";

const Output = ({ language, value }) => {
  //   console.log(language);//selected language
  //   console.log(value);//source code

  //as soon as i click on runCode button this function runs
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const runCode = async () => {
    if (!value) return;
    setIsLoading(true);
    try {
      const response = await executeCode(language, value);
      // console.log(response);
      const { output, stderr } = response.run;
      //console.log(output);
      setOutput(output);
      setIsError(!!stderr);
    } catch (error) {
      setOutput("Something went wrong.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-[30%] border-t border-[#2a2a2a]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#141414] border-b border-[#2a2a2a] shrink-0">
        <span className="text-[11px] text-[#555]">Output</span>
        <button
          onClick={runCode}
          disabled={isLoading}
          className="px-3 py-1 border border-[#3a7a3a] text-[#4caf50] text-xs rounded-lg hover:bg-[#1a3a1a] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>
      </div>

      {/* Output body */}
      <div
        className={`flex-1 p-3.5 bg-[#141414] text-[13px] leading-6 overflow-y-auto scrollbar-hide
        ${isError ? "text-red-400" : "text-[#4caf50]"}`}
      >
        {!output ? (
          <span className="text-[#3a3a3a]">
            Click "Run Code" to see the output here
          </span>
        ) : (
          <pre className="whitespace-pre-wrap">{output}</pre>
        )}
      </div>
    </div>
  );
};

export default Output;
