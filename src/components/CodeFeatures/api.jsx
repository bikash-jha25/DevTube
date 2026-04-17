import { LANGUAGE_VERSIONS, GROQ_API_KEY } from "../../utils/constants";

export const executeCode = async (language, value) => {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 2048,
        messages: [
          {
            role: "system",
            content: `You are a code executor. Run the given code mentally and return ONLY the exact terminal output. No explanation. No markdown. No code blocks. Just raw output exactly as a terminal would print it.`,
          },
          {
            role: "user",
            content: `Language: ${language} (${LANGUAGE_VERSIONS[language]})\n\nCode:\n${value}`,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content?.trim() || "No output";

  return {
    run: {
      output,
      stderr: null,
    },
  };
};

// import {
//   LANGUAGE_VERSIONS,
//   ONLINE_COMPILER_API_KEY,
// } from "../../utils/constants";

// const LANGUAGE_MAP = {
//   javascript: "nodejs",
//   python: "python3",
//   java: "java",
//   cpp: "cpp",
//   csharp: "csharp",
//   typescript: "typescript",
//   rust: "rust",
// };

// export const executeCode = async (language, value) => {
//   const response = await fetch("https://api.onlinecompiler.io/run/sync", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: ONLINE_COMPILER_API_KEY,
//     },
//     body: JSON.stringify({
//       language: LANGUAGE_MAP[language] || language,
//       code: value,
//     }),
//   });

//   const data = await response.json();
//   console.log(data); // log first so you can see exact response shape

//   return {
//     run: {
//       output: data.output || data.stdout || "No output",
//       stderr: data.stderr || data.error || null,
//     },
//   };
// };

// import axios from "axios";
// import { LANGUAGE_VERSIONS } from "../../utils/constants";

// const API = axios.create({
//   baseURL: "https://piston.emkc.org/api/v2/piston", // ← changed
// });

// export const executeCode = async (language, value) => {
//   const response = await API.post("/execute", {
//     language: language,
//     version: LANGUAGE_VERSIONS[language],
//     files: [
//       {
//         content: value,
//       },
//     ],
//   });

//   return response.data;
// };

// 👉 Sends your code to Piston API (online compiler)
// 👉 Gets output back
