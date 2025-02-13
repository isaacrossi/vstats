export const StatWithDividers = ({ children, statTitle }) => (
  <div className="w-full md:w-2/3 relative md:mr-12 min-h-[100px] mb-14 md:mb-16 md:pr-[7px]">
    <span className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-slate-300 to-blue-50" />
    <h4 className="text-xl lg:text-2xl font-heading text-center pt-5 mb-1">
      {children}
    </h4>
    <p className="uppercase text-sm text-center pb-5">{statTitle}</p>
    <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-slate-300 to-blue-50" />
  </div>
);
