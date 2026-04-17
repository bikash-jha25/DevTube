import React, { useState, useRef, useEffect } from "react";
import { LANGUAGE_VERSIONS } from "../../utils/constants";
import { IoChevronDownOutline } from "react-icons/io5";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentVersion = LANGUAGE_VERSIONS[language];

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[#161616] border-b border-[#2a2a2a]">
      <span className="text-xs text-[#555]">Language:</span>

      {/* Dropdown wrapper */}
      <div className="relative" ref={dropdownRef}>

        {/* Trigger button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#272727] border border-[#3a3a3a] hover:border-[#555] rounded-lg text-xs text-[#e0e0e0] transition cursor-pointer"
        >
          <span className="font-semibold">{language}</span>
          <span className="text-[#555]">({currentVersion})</span>
          <IoChevronDownOutline
            className={`text-[#666] text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown list */}
        {isOpen && (
          <ul className="absolute top-full left-0 mt-1.5 w-56 bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl overflow-hidden z-50 shadow-lg max-h-64 overflow-y-auto scrollbar-hide">
            {languages.map(([lang, version]) => (
              <li
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-2 text-xs cursor-pointer transition
                  ${language === lang
                    ? "bg-[#2a2a2a] text-white"
                    : "text-[#aaa] hover:bg-[#272727] hover:text-white"
                  }`}
              >
                <span className="font-semibold">{lang}</span>
                <span className="text-[#555]">{version}</span>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
};

export default LanguageSelector;

// import React from "react";
// import { LANGUAGE_VERSIONS } from "../../utils/constants";

// const languages = Object.entries(LANGUAGE_VERSIONS);

// const LanguageSelector = ({ language, setLanguage }) => {
//   return (
//     <div>
//       <div className="flex items-center gap-3 px-4 py-2.5 bg-[#161616] border-b border-[#2a2a2a]">
//         <span className="text-xs text-[#555]">Language:</span>

//         <div className="px-3 py-1 bg-[#272727] border border-[#3a3a3a] rounded-lg text-xs text-[#e0e0e0]">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-black outline-none font-bold"
//           >
//             {languages.map(([lang, version]) => (
//               <option value={lang} key={lang}>
//                 {lang} ({version})
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LanguageSelector;
