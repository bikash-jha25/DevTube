import React, { useState, useEffect, useRef } from "react";
import { GROQ_API_KEY } from "../utils/constants";
import { RiGeminiFill } from "react-icons/ri";

const AiChatBot = () => {
  //messages is the array of object which has two thing role {role,content}
  const [messages, setMessages] = useState([
    //intiial messsage
    {
      role: "assistant",
      content: "Hey! Ask me anything about this video 🎬",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // auto scroll on chnage of messages variable
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //this send message will be executed once i call this fron input box send button.
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];

    setMessages(newMessages);
    setInput(""); //clearing out the input box
    setLoading(true); //so that loading shimmer will be displayed

    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            max_tokens: 150, // optimized
            messages: newMessages, //our new messages/prompt
          }),
        },
      );

      const data = await res.json();
      // console.log(data);

      const reply =
        data?.choices?.[0]?.message?.content || "Something went wrong.";
      //appending the new response object{name,content} to messages varible
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error reaching AI." },
      ]);
    }

    setLoading(false); //stop loading shimmer
  };

  return (
    <div className="flex flex-col h-full">
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-3 scrollbar-hide">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Bot icon */}
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-gray-600 flex items-center justify-center shrink-0 mr-2 mt-1">
                <RiGeminiFill className="text-sm text-white" />
              </div>
            )}

            {/* Message bubble (transparent bg feel) */}
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap
                ${
                  msg.role === "user"
                    ? "bg-white text-black rounded-br-sm"
                    : "bg-transparent text-gray-200 border border-gray-700 rounded-bl-sm"
                }`}
            >
              {/* the message */}
              {msg.content}
            </div>
          </div>
        ))}
        {/* Simple loading */}
        {loading && <p className="text-gray-400 text-sm">Thinking...</p>}
        <div ref={bottomRef} />
        {/* //empty div for auto scroll at bottom */}
      </div>

      {/* INPUT (UNCHANGED STYLE ✅) */}
      <div className="p-3 border-t border-gray-600 flex gap-2 shrink-0">
        <input
          type="text"
          value={input} //show me what i am typing
          onChange={(e) => setInput(e.target.value)} // whatever is inside input box take that and put that into state varibale
          placeholder="Ask anything..."
          disabled={loading}
          className="flex-1 bg-black text-white px-3 py-2 rounded-lg outline-none border border-gray-700 focus:border-gray-500 text-sm disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()} //disable the send button when empty input
          className="bg-white text-black px-4 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-40 hover:bg-gray-200 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiChatBot;
