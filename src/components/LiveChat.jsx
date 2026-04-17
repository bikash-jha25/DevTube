import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { getRandomIndianName, getRandomMessage } from "../utils/helper";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  //once the LiveChat componet is mounted lets just push new messgaes object into store after every 2000
  //Live store update
  const dispatch = useDispatch();
  const allMessages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const i = setInterval(() => {
      //API POLLING
      dispatch(
        addMessage({
          name: getRandomIndianName(),
          message: getRandomMessage(),
        }),
      );
    }, 1500);
    return () => clearInterval(i);
  }, []);
  //Custom message
  const inputRef = useRef(null);

  const onSendHandler = () => {
    dispatch(
      addMessage({
        name: "You",
        message: inputRef.current.value,
      }),
    );
    inputRef.current.value = ""; // clear input
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse scrollbar-hide">
        {allMessages &&
          allMessages.map((it, index) => (
            <ChatMessage name={it.name} message={it.message} key={index} />
          ))}
      </div>
      {
        <div className="p-3 border-t border-gray-600 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here..."
            className="flex-1 bg-black text-white px-3 py-2 rounded-lg outline-none"
          />
          <button
            className="bg-red-500 px-4 rounded-lg text-white cursor-pointer"
            onClick={() => onSendHandler()}
          >
            Send
          </button>
        </div>
      }
    </div>
  );
};

export default LiveChat;
