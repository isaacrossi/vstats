export const StatWithDividers = ({
  children,
  statTitle,
  hasSidebar = false,
  isDark = false,
}) => (
  <div
    className={`w-full ${
      hasSidebar && "md:w-2/3 md:mr-12"
    } relative min-h-[100px] mb-14 md:mb-16 md:pr-[7px]
    ${isDark ? "text-slate-50" : "text-slate-900"}`}
  >
    <span
      className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${
        isDark ? "from-slate-600 to-blue-1000" : "from-slate-300 to-blue-50"
      }`}
    />
    <h4 className="text-xl lg:text-2xl font-heading text-center pt-5 mb-1">
      {children}
    </h4>
    <p className="uppercase text-sm text-center pb-5">{statTitle}</p>
    <span
      className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r ${
        isDark ? "from-slate-600 to-blue-1000" : "from-slate-300 to-blue-50"
      }`}
    />
  </div>
);
