import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-start gap-3 px-3 py-2 hover:bg-[#2a2a2a]">
      
      {/* Avatar */}
      <img
        className="w-8 h-8 rounded-full"
        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`}
        alt="avatar"
      />

      {/* Message Content */}
      <div className="text-sm">
        <span className="font-semibold text-[#aaa] mr-2">
          {name}
        </span>
        <span className="text-white wrap-break-words">
          {message}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;