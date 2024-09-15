import { GoX } from "react-icons/go";
import { GoSearch } from "react-icons/go";

const SearchForm = ({
  searchTerm,
  submittedSearchTerm,
  onSearchInput,
  onSearchSubmit,
  onSearchCancel,
}) => (
  <form onSubmit={onSearchSubmit} className="mb-6 relative max-w-80 h-auto">
    <InputWithLabel
      id="search"
      label="Search"
      value={searchTerm}
      onInputChange={onSearchInput}
    >
      Search
    </InputWithLabel>
    {submittedSearchTerm ? (
      <CancelButton onClick={onSearchCancel} />
    ) : (
      <SearchButton searchTerm={searchTerm} />
    )}
  </form>
);

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => (
  <div>
    <label htmlFor={id} className="sr-only">
      {children}
    </label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      autoFocus={isFocused}
      onChange={onInputChange}
      autoComplete="off"
      placeholder="Search must be at least 4 characters"
      className="w-80 py-2 bg-transparent border-b border-red-600 text-slate-50"
    />
  </div>
);

const SearchButton = ({ searchTerm }) => (
  <button
    type="submit"
    aria-label="Submit search"
    disabled={searchTerm.length > 0 && searchTerm.length < 4}
    className="absolute right-0 bottom-3"
  >
    <GoSearch size={20} className="text-red-600" />
  </button>
);

const CancelButton = ({ onClick }) => (
  <button
    type="button"
    aria-label="Cancel search"
    className="absolute right-0 bottom-3"
    onClick={onClick}
  >
    <GoX size={20} className="text-red-600" />
  </button>
);

export { SearchForm, InputWithLabel };
