export const ListItem = ({ title, children }) => (
  <li className="mb-4">
    <h3 className="text-s text-slate-500 uppercase mb-2">{title}</h3>
    <p className="text-base uppercase text-slate-50">{children}</p>
  </li>
);
