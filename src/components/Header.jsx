import React, { use, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { addCache } from "../utils/searchSlice";
import { SiAudiobookshelf } from "react-icons/si";
import { GOOGLE_API_KEY, YOUTUBE_SEARCH_KEYWORD_API } from "../utils/constants";
import { searchVideos, setFetching } from "../utils/videosSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  //Dropdown for search suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  //Debouncing
  // const [searchQuery, setSearchQuery] = useState("");
  // useEffect(() => {
  //   // console.log(searchQuery);
  //   // getSearchSuggestions(); put this inside timeout.
  //   const timer = setTimeout(() => {
  //     getSearchSuggestions();
  //   }, 200);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [searchQuery]);

  // const getSearchSuggestions = async () => {
  //   console.log("API Call for " + searchQuery);
  //   const response = await fetch(
  //     `/api/suggestions?client=firefox&ds=yt&q=${searchQuery}`,
  //   );
  //   const data = await response.json();
  //   //console.log(data[1]);
  //   setSuggestions(data[1]); //this is array of suggestions.
  // };

  //Optimizing debouncing API call with caching.
  const cacheObj = useSelector((store) => store.search.cache); //now i have my cache object with me.
  //Now before making API call ,i will check if that query is present or not in cache.
  //modify debounce logic.
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (searchQuery == null) return;
    //check in cache
    const timer = setTimeout(() => {
      if (cacheObj[searchQuery]) {
        setSuggestions(cacheObj[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    // console.log("API Call for " + searchQuery);
    const response = await fetch(
      `/api/suggestions?client=firefox&ds=yt&q=${searchQuery}`,
    );
    const data = await response.json();
    //console.log(data[1]);
    //first sotore the results in cache and
    dispatch(addCache({ query: searchQuery, results: data[1] })); //storing in cache.
    //then set suggestions.
    setSuggestions(data[1]); //this is array of suggestions.
  };

  //Search on Input box
  const handleSearch = async () => {
    dispatch(setFetching(true));
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&q=${searchQuery}&key=${GOOGLE_API_KEY}`,
    );
    const data = await response.json();
    //console.log(data.items);
    dispatch(searchVideos(data.items));
    dispatch(setFetching(false));
  };

  //Go to focus Mode
  const navigate = useNavigate();
  const location = useLocation();
  const handleFocusToggle = () => {
    if (location.pathname === "/focus") {
      navigate("/"); // go back home
    } else {
      navigate("/focus"); // open focus mode
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#0f0f0f]  sticky top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <RxHamburgerMenu
          alt="Menu"
          className="w-6 cursor-pointer text-2xl"
          onClick={() => toggleMenuHandler()}
        />
        <a href="/">
          <img src={logo} alt="Logo" className="w-28  cursor-pointer" />
        </a>
      </div>

      {/* CENTER */}
      <div className="flex items-center w-[40%] max-w-2xl relative">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          type="text"
          placeholder="Search"
          className="w-full px-5 py-2 border border-gray-600 bg-[#121212] text-white rounded-l-full focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
        <button
          onClick={() => handleSearch()}
          className="px-5 py-2 border border-gray-600 bg-[#222222] rounded-r-full hover:bg-[#333333] cursor-pointer"
        >
          {/* <img src={<IoIosSearch />} alt="Search" className="w-6" /> */}
          <IoIosSearch className="text-2xl" />
        </button>

        {/* SUGGESTIONS DROPDOWN */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full mt-2 bg-[#212121] border border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="px-5 py-2 text-white text-sm hover:bg-[#303030] cursor-pointer"
                onMouseDown={() => {
                  setSearchQuery(s);
                  handleSearch();
                }}
              >
                <span className="flex gap-2 items-center">
                  {<IoIosSearch className="text-2xl" />} {s}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex  items-center gap-3 ">
        {/* <SiAudiobookshelf
          onClick={handleFocusToggle}
          className="text-4xl cursor-pointer  hover:text-white transition-all duration-200 hover:scale-110"
        /> */}
        <button
          onClick={handleFocusToggle}
          className="fixed top-2 right-16 z-50 text-gray-400 hover:text-white transition-all duration-600 ease-in-out hover:scale-110 cursor-pointer"
        >
          <Clock className="w-8 h-8" />
        </button>

        {/* <img
          src={avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
        /> */}
      </div>
    </div>
  );
};

export default Header;
