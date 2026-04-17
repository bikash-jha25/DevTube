import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

//arry of objects
const commentData = [
  {
    name: "Bikash Jha",
    text: "He is the one who helps",
    replies: [
      {
        name: "Bikash Jha",
        text: "He is the one who helps",
        replies: [
          {
            name: "Bikash Jha",
            text: "He is the one who helps",
            replies: [
              {
                name: "Bikash Jha",
                text: "He is the one who helps",
                replies: [
                  {
                    name: "Bikash Jha",
                    text: "He is the one who helps",
                    replies: [
                      {
                        name: "Bikash Jha",
                        text: "He is the one who helps",
                        replies: [
                          {
                            name: "Bikash Jha",
                            text: "He is the one who helps",
                            replies: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Bikash Jha",
            text: "He is the one who helps",
            replies: [
              {
                name: "Bikash Jha",
                text: "He is the one who helps",
                replies: [
                  {
                    name: "Bikash Jha",
                    text: "He is the one who helps",
                    replies: [
                      {
                        name: "Bikash Jha",
                        text: "He is the one who helps",
                        replies: [
                          {
                            name: "Bikash Jha",
                            text: "He is the one who helps",
                            replies: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Bikash Jha",
        text: "He is the one who helps",
        replies: [
          {
            name: "Bikash Jha",
            text: "He is the one who helps",
            replies: [
              {
                name: "Bikash Jha",
                text: "He is the one who helps",
                replies: [],
              },
              {
                name: "Bikash Jha",
                text: "He is the one who helps",
                replies: [],
              },
            ],
          },
          {
            name: "Bikash Jha",
            text: "He is the one who helps",
            replies: [],
          },
          {
            name: "Bikash Jha",
            text: "He is the one who helps",
            replies: [
              {
                name: "Bikash Jha",
                text: "He is the one who helps",
                replies: [],
              },
              {
                name: "Bikash Jha",
                text: "He is the one who helps",
                replies: [
                  {
                    name: "Bikash Jha",
                    text: "He is the one who helps",
                    replies: [
                      {
                        name: "Bikash Jha",
                        text: "He is the one who helps",
                        replies: [],
                      },
                    ],
                  },
                  {
                    name: "Bikash Jha",
                    text: "He is the one who helps",
                    replies: [
                      {
                        name: "Bikash Jha",
                        text: "He is the one who helps",
                        replies: [],
                      },
                      {
                        name: "Bikash Jha",
                        text: "He is the one who helps",
                        replies: [],
                      },
                    ],
                  },
                  {
                    name: "Bikash Jha",
                    text: "He is the one who helps",
                    replies: [],
                  },
                  {
                    name: "Bikash Jha",
                    text: "He is the one who helps",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Bikash Jha",
        text: "He is the one who helps",
        replies: [],
      },
    ],
  },
  {
    name: "Bikash Jha",
    text: "He is the one who helps",
    replies: [],
  },
  {
    name: "Bikash Jha",
    text: "He is the one who helps",
    replies: [],
  },
  {
    name: "Bikash Jha",
    text: "He is the one who helps",
    replies: [],
  },
  {
    name: "Bikash Jha",
    text: "He is the one who helps",
    replies: [],
  },
  {
    name: "Bikash Jha",
    text: "He is the one who helps",
    replies: [],
  },
];

//making one comment
const Comment = ({ data }) => {
  const { name, text } = data;

  return (
    <div className="flex gap-3 py-3">
      {/* Avatar */}
      <RxAvatar className="text-3xl text-gray-400" />

      {/* Content */}
      <div>
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-300">{text}</p>

        {/* Actions (optional like YouTube) */}
        <div className="flex gap-4 mt-1 text-xs text-gray-400">
          <span className="cursor-pointer hover:text-white">
            <AiOutlineLike className="text-2xl" />
          </span>
          <span className="cursor-pointer hover:text-white">
            <AiOutlineDislike className="text-2xl" />
          </span>
          <span className="cursor-pointer hover:text-white text-lg">Reply</span>
        </div>
      </div>
    </div>
  );
};

//renders all the first level comments
const CommentList = ({ commentData }) => {
  return commentData.map((comment, ind) => (
    <div key={ind}>
      {/* Main comment */}
      <Comment data={comment} />

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="ml-8 pl-4 border-l border-gray-700">
          <CommentList commentData={comment.replies} />
        </div>
      )}
    </div>
  ));
};

const CommentsContainer = ({ commentCount }) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="mt-6 px-4">
      <h1 className="text-xl font-semibold text-white mb-4">
        {commentCount} Comments
      </h1>
      <button
        className={`text-white cursor-pointer rounded-xl p-2 bg-[#272727]`}
        onClick={() => setShowComments(!showComments)}
      >
        {!showComments ? "See Comments" : "Hide comments"}
      </button>
      {showComments && <CommentList commentData={commentData} />}
    </div>
  );
};

export default CommentsContainer;
//const commentData = [];
//array of object
//each object has
//-name
//-text
//-replies[name,text,replies->[name,text,replies->[name,text,replies] ]  ] replies is an array of object
