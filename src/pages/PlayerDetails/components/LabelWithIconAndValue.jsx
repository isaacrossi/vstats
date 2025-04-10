export const LabelWithIconAndValue = ({
  label,
  Icon,
  value,
  bold = false,
  textColor = "text-slate-900",
  iconColor = "text-slate-900",
  border = true,
  isWithoutSlash = false,
  isDark = false,
}) => (
  <li
    className={`relative flex justify-between pb-4 mb-4 last:pb-4 last:mb-0   ${
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
    <p className={`font-bold ${textColor}`}>{value}</p>

    {border && (
      <span
        className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r ${
          isDark ? "from-slate-600 to-blue-1000" : "from-slate-300 to-blue-50"
        }`}
      />
    )}
  </li>
);
