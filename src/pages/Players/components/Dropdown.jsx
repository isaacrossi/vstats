// Importing necessary hooks and components
import { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick"; // Custom hook to handle outside click
import { GoChevronDown } from "react-icons/go"; // Chevron down icon from react-icons library
import { shortenTeamName } from "../../../utils/shortenTeamName"; // Function to shorten team name

// Dropdown component definition
const Dropdown = ({
  id, // ID for the dropdown button
  data, // Data to populate the dropdown
  title = "select", // Default title for the dropdown
  selectedItemId,
  hasImage, // Boolean to determine if images should be displayed
  imgKey, // Key to access image URL in data
  onChange, // Function to handle item selection
}) => {
  // State to manage dropdown open/close status
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = data.find((item) => item.id === selectedItemId);

  // Handle change of selected item
  const handleChange = (item) => {
    setIsOpen(false);
    onChange(item);
    console.log(item.id);
  };

  // Ref for the dropdown element
  const dropdownRef = useRef(null);
  // Use custom hook to handle outside click
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  return (
    <div ref={dropdownRef} className="relative w-64">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex align-center justify-between w-64 py-2 bg-transparent border-b border-red-600 text-slate-50"
      >
        <span className="flex">
          {selectedItemId !== 0 && selectedItem && (
            <img
              className="mr-2 h-6 w-6"
              src={selectedItem?.[imgKey] || ""}
              alt="selected item"
            />
          )}
          {selectedItem ? shortenTeamName(selectedItem?.name) : title}
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
                key={item?.id}
                onClick={() => handleChange(item)}
              >
                {hasImage && item.id !== 0 && (
                  <img
                    className="mr-2 h-6 w-6"
                    src={item?.[imgKey] || ""}
                    alt="team"
                    loading="lazy"
                  />
                )}
                <span>{shortenTeamName(item?.name)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Dropdown };
