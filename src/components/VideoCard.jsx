import React, { useEffect, useState } from "react";
import { GOOGLE_API_KEY, YOUTUBE_CHANNEL_API } from "../utils/constants";

const formatCount = (count) => {
  if (!count) return "0";
  const n = parseInt(count);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
};

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr);
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return "Today";
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${Math.floor(months / 12)} year${Math.floor(months / 12) > 1 ? "s" : ""} ago`;
};

const VideoCard = ({ info }) => {
  if (!info) return null;
  // console.log(info);
  const snippet = info?.snippet || {};
  const statistics = info?.statistics || {};
  const { channelTitle, title, thumbnails, publishedAt, channelId } = snippet;
  const { viewCount } = statistics;

  //get the channel avatar from the channelID
  const [ytIcon, setYtIcon] = useState(null);
  const getavatar = async () => {
    try {
      const response = await fetch(
        YOUTUBE_CHANNEL_API + channelId + "&key=" + GOOGLE_API_KEY,
      );
      const data = await response.json();
      const icon =
        data?.items[0]?.snippet?.thumbnails?.high?.url ||
        data?.items?.[0]?.snippet?.thumbnails?.medium?.url ||
        data?.items?.[0]?.snippet?.thumbnails?.default?.url;
      // console.log(data?.items[0]?.snippet?.thumbnails);
      setYtIcon(icon || null);
    } catch (error) {
      setYtIcon(null);
    }
  };
  //i will uncommt them later
  // useEffect(() => {
  //   getavatar();
  // }, [channelId]);

  const initials = channelTitle?.charAt(0).toUpperCase() ?? "?";
  if (!thumbnails?.high?.url && !thumbnails?.medium?.url) return null;
  return (
    <div className="w-90 cursor-pointer ">
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden bg-black aspect-video transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.15)]">
        <img
          src={thumbnails?.high?.url}
          alt={title}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Meta */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#272727] flex items-center justify-center text-sm font-semibold text-gray-300 shrink-0 overflow-hidden">
          {ytIcon ? (
            <img
              src={ytIcon}
              alt={channelTitle}
              className="w-full h-full  object-cover "
              onError={() => setYtIcon(null)}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col">
          {/* Title */}
          <h3 className="text-[15px] font-semibold leading-snug line-clamp-2 text-white">
            {title}
          </h3>

          {/* Channel */}
          <p className="text-[13px] font-semibold text-gray-400 mt-1">
            {channelTitle}
          </p>

          {/* Stats */}
          <p className="text-[13px] font-semibold text-gray-400">
            {viewCount ? (
              <>
                {formatCount(viewCount)} views • {timeAgo(publishedAt)}
              </>
            ) : (
              timeAgo(publishedAt)
            )}
            {/* {formatCount(viewCount)} views • {timeAgo(publishedAt)} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
