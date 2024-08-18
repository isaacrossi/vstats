import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { GoChevronDown } from "react-icons/go";
import { shortenTeamName } from "../utils/shortenTeamName";

const Dropdown = ({
  id,
  title = "select",
  data,
  hasImage,
  category,
  imgKey,
}) => {
  const [isOpen, setIsopen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const selectedItem = selectedItemId
    ? data?.find((item) => item[category]?.id === selectedItemId)
    : undefined;

  const handleChange = (item) => {
    setSelectedItemId(item[category]?.id);
    setIsopen(false);
  };

  const dropdownRef = useRef(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsopen(false),
  });

  return (
    <div ref={dropdownRef} className="relative w-64">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsopen(!isOpen)}
        className="flex align-center justify-between w-64 py-2 bg-transparent border-b border-red-600 text-slate-50"
      >
        <span className="flex">
          <img
            className="mr-2 h-6 w-6"
            src={selectedItem?.[category]?.[imgKey] || ""}
          />
          {shortenTeamName(selectedItem?.[category]?.name || title)}
        </span>
        <GoChevronDown
          size={20}
          className={`transform duration-500 ease-in-out text-red-600 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute bg-blue-950 mt-2 w-max max-h-52 overflow-y-auto py-3 shadow-md rounded-md z-10">
          <ul
            className="bg-blue-950 w-64"
            role="menu"
            aria-labelledby={id}
            aria-orientation="vertical"
          >
            {data?.map((item) => (
              <li
                className="flex items-center px-4 py-2 text-slate-50 hover:text-red-600 cursor-pointer"
                key={item?.[category]?.id}
                onClick={() => handleChange(item)}
              >
                {hasImage && (
                  <img
                    className="mr-2 h-6 w-6"
                    src={item?.[category]?.[imgKey] || ""}
                    alt="team"
                    loading="lazy"
                  />
                )}
                <span>{shortenTeamName(item?.[category]?.name) ?? title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
