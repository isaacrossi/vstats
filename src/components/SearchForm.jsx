const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit} className="mb-6 relative max-w-80 h-auto">
    <InputWithLabel
      id="search"
      label="Search"
      value={searchTerm}
      onInputChange={onSearchInput}
    >
      Search
    </InputWithLabel>
    <IconButton searchTerm={searchTerm} />
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

const IconButton = ({ searchTerm }) => (
  <button
    type="submit"
    disabled={searchTerm.length > 0 && searchTerm.length < 4}
    className="absolute right-0 bottom-3 bg-search-icon bg-no-repeat bg-right bg-auto w-5 h-5"
  />
);

export default SearchForm;
