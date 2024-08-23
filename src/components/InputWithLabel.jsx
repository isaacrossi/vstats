export const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  onSubmit,
  isFocused,
  children,
}) => (
  <form onSubmit={onSubmit} className="mb-6">
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
      placeholder="Search for a player"
      className="w-64 py-2 bg-transparent border-b border-red-600 bg-search-icon bg-no-repeat bg-right bg-auto text-slate-50"
    />
  </form>
);
