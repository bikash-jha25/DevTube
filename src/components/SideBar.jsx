import React from "react";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { IoMdMusicalNote } from "react-icons/io";
import { MdMovieCreation } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa6";
import { TfiCup } from "react-icons/tfi";
import { PiApplePodcastsLogoBold } from "react-icons/pi";
import { RiGraduationCapFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const SideBar = () => {
  //store.<sliceName>.<state>
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;

  return (
    <div className="scrollbar-hide w-56 shrink-0 px-3 py-4 overflow-y-auto border-r border-gray-700">
      {/* SECTION 1 */}
      <div className="mb-4">
        <Link to="/">
          {" "}
          <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
            <span className="text-2xl">
              <FaHome />
            </span>
            <span className="text-sm">Home</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <SiYoutubeshorts />
          </span>
          <span className="text-sm">Notes</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <MdSubscriptions />
          </span>
          <span className="text-sm">Subscriptions</span>
        </div>
      </div>

      <hr className="my-3 border-gray-500" />

      {/* SECTION 2 */}
      <div className="mb-4">
        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <AiFillLike />
          </span>
          <span className="text-sm">Liked Videos</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <MdWatchLater />
          </span>
          <span className="text-sm">Watch Later</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <FaHistory />
          </span>
          <span className="text-sm">History</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <MdOutlinePlaylistPlay />
          </span>
          <span className="text-sm">Playlists</span>
        </div>
      </div>

      <hr className="my-3 border-gray-500" />

      {/* SECTION 3 */}
      <div>
        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <RiShoppingBag4Fill />
          </span>
          <span className="text-sm">Shopping</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <IoMdMusicalNote />
          </span>
          <span className="text-sm">Music</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <MdMovieCreation />
          </span>
          <span className="text-sm">Movies</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <MdLiveTv />
          </span>
          <span className="text-sm">Live</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <IoGameController />
          </span>
          <span className="text-sm">Gaming</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <FaRegNewspaper />
          </span>
          <span className="text-sm">News</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <TfiCup />
          </span>
          <span className="text-sm">Sports</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <PiApplePodcastsLogoBold />
          </span>
          <span className="text-sm">Podcast</span>
        </div>

        <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
          <span className="text-2xl">
            <RiGraduationCapFill />
          </span>
          <span className="text-sm">Courses</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
