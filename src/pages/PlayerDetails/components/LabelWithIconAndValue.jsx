export const LabelWithIconAndValue = ({
  label,
  Icon,
  value,
  bold = false,
  textColor = "text-slate-900",
  iconColor = "text-slate-900",
  border = true,
  isWithoutSlash = false,
}) => (
  <li
    className={`relative flex justify-between pb-4 mb-4 last:pb-4 last:mb-0 min-h-[49px] ${
      isWithoutSlash && "[&:nth-child(3)]:ml-8"
    }`}
  >
    <div className="flex items-center">
      {Icon ? <Icon className={`w-6 h-6 mr-2 ${iconColor}`} /> : null}
      <p
        className={`${textColor} ${
          bold ? "font-bold" : "font-medium"
        } uppercase`}
      >
        {label}
      </p>
    </div>
    {value && <p className="font-bold text-slate-900">{value}</p>}

    {border && (
      <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-slate-300 to-blue-50" />
    )}
  </li>
);
