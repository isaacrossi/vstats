import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { GoChevronDown } from "react-icons/go";

const Dropdown = ({
  id,
  title = "select",
  data,
  hasImage,
  selectedId,
  onSelect,
}) => {
  const [isOpen, setIsopen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );

  const handleChange = (item) => {
    setSelectedItem(item); //update the selectedItem state with the selected item
    onSelect && onSelect(item.id); // Call onSelect prop function with the selected item's id/ *this is a shorthand for if(onSelect) { onSelect(item.id) }
    setIsopen(false); //close the dropdown
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsopen(false),
  });

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsopen(!isOpen)}
        className="flex align-center justify-between w-64 py-2 bg-transparent border-b border-red-600 text-slate-50"
      >
        <span>{selectedItem?.name || title}</span>
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
            {data.map((item) => (
              <li
                className="flex items-center px-4 py-2 text-slate-50 hover:text-red-600 cursor-pointer"
                key={item.id}
                onClick={() => handleChange(item)}
              >
                {hasImage && (
                  <img
                    className="mr-2"
                    src={item.imageUrl}
                    alt="team"
                    loading="lazy"
                  />
                )}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
