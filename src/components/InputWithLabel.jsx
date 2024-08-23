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
      placeholder="Search must be at least 4 characters"
      className="w-80 py-2 bg-transparent border-b border-red-600 text-slate-50"
    />
  </form>
);
