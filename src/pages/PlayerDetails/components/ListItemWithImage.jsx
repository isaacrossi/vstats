export const ListItemWithImage = ({ title, imgSrc, imgAlt, children }) => (
  <li className="mb-4">
    <h3 className="text-s text-slate-500 uppercase mb-2">{title}</h3>
    <div className="flex items-center">
      <img className="w-6 h-6 mr-2" src={imgSrc} alt={imgAlt} />
      <p className="text-base uppercase text-slate-50">{children}</p>
    </div>
  </li>
);
