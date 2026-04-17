import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendVideos, setFetching } from "../utils/videosSlice";
import { getYoutubeVideosAPI } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import ShimmerContainer from "./Shimmer/ShimmerContainer";

const VideoContainer = () => {
  const dispatch = useDispatch();

  // get videos array and nextPageToken from redux store
  const videos = useSelector((store) => store.videos.items);
  // console.log(videos);
  const nextPageToken = useSelector((store) => store.videos.nextPageToken);
  const isFetching = useSelector((store) => store.videos.isFetching);

  // this is an empty div at the bottom of the page
  // we will watch it — when it becomes visible, load more videos
  const bottomRef = useRef(null);

  // fetch videos from youtube API
  // pageToken is empty string for first call, then youtube gives us the next one
  const getVideos = async (pageToken = "") => {
    if (isFetching) return; // dont call again if already loading

    dispatch(setFetching(true));
    //getYoutubeVideosAPI() is dynamic URL genrating function.
    const res = await fetch(getYoutubeVideosAPI(pageToken));
    const json = await res.json();
    // console.log(json);
    dispatch(
      appendVideos({
        items: json.items || [], //this is array of objects
        nextPageToken: json.nextPageToken || null,
      }),
    );

    dispatch(setFetching(false));
  };

  // runs once on mount — load the first batch of videos
  useEffect(() => {
    if (videos.length === 0) {
      getVideos("");
    }
  }, []);

  // this useEffect watches the bottom div
  // as soon as the bottom div is visible on screen → load more
  useEffect(() => {
    // IntersectionObserver is a browser API
    // it tells you when an element enters or leaves the screen
    const observer = new IntersectionObserver((entries) => {
      const bottomDiv = entries[0]; //i am observing only one div

      // isIntersecting = true means the bottom div is now visible
      if (bottomDiv.isIntersecting && nextPageToken) {
        getVideos(nextPageToken); // load next page
      }
    });

    // start watching the bottom div
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    // cleanup — stop watching when component unmounts
    return () => observer.disconnect();
  }, [nextPageToken]); // re-run whenever nextPageToken changes

  return (
    <div className="flex flex-wrap justify-center gap-6 pb-10 scrollbar-hide">
      {isFetching && <ShimmerContainer />}
      {/* render all videos from redux store */}
      {videos.map((video) => {
        //Because Search Result API and Fetch video api are different so need to extract videoId correctly
        const videoId =
          typeof video.id === "string" ? video.id : video.id?.videoId;

        return (
          <Link to={"/watch?v=" + videoId} key={videoId}>
            <VideoCard info={video} />
          </Link>
        );
      })}

      {/* loading dots — shown while fetching */}
      {isFetching && <ShimmerContainer />}

      {/* invisible div sitting at the bottom of the page */}
      {/* IntersectionObserver watches this */}
      <div ref={bottomRef} className="w-full h-1" />
    </div>
  );
};

export default VideoContainer;

// import React, { useEffect, useState } from "react";
// import { YOUTUBE_VIDEOS_API } from "../utils/constants";
// import VideoCard from "./VideoCard";
// import { Link } from "react-router-dom";

// const VideoContainer = () => {
//   const [videoInfo, setVideoInfo] = useState([]);
//   useEffect(() => {
//     getVideos();
//   }, []);
//   const getVideos = async () => {
//     const data = await fetch(YOUTUBE_VIDEOS_API);
//     const json = await data.json();
//     //console.log(json);
//    // console.log(json.items); //this is array of videos information.
//     setVideoInfo(json.items);
//   };
//   return (
//     <div className="flex flex-wrap justify-center gap-6 ">
//       {videoInfo.map((video, index) => (
//         <Link to={"/watch?v=" + video.id} key={video.id}>
//           <VideoCard info={video} />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default VideoContainer;
