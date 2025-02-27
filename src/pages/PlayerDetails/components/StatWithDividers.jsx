export const StatWithDividers = ({
  children,
  statTitle,
  hasSidebar = false,
  isDark = false,
  hasSolidBorder = false,
  isSingle = false,
}) => (
  <div
    className={`w-full relative h-fit last:mb-14 last:md:mb-16 mb-0
      ${hasSidebar && "md:w-2/3 md:mr-12 md:pr-[7px]"} 
      ${isDark ? "text-slate-50" : "text-slate-900"}
      ${
        hasSolidBorder &&
        isDark &&
        "md:border-r md:border-solid md:border-slate-600"
      }
      ${
        hasSolidBorder &&
        !isDark &&
        "md:border-r md:border-solid md:border-slate-300"
      }
      ${isSingle && "mb-14 md:mb-16"}

    `}
  >
    <span
      className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r  ${
        isDark ? "from-slate-600 to-blue-1000" : "from-slate-300 to-blue-50"
      }
        ${
          hasSolidBorder &&
          isDark &&
          "md:bg-slate-600 sm:bg-gradient-to-r sm:from-slate-600 to-blue-1000"
        }
        ${
          hasSolidBorder &&
          !isDark &&
          "md:bg-slate-300 sm:bg-gradient-to-r sm:from-slate-300 to-blue-50"
        }
      }`}
    />
    <h4 className={`text-xl lg:text-2xl font-heading text-center pt-5 mb-1`}>
      {children}
    </h4>
    <p className={`uppercase text-sm text-center pb-5 `}>{statTitle}</p>
    <span
      className={`absolute md:bottom-[-3px] lg:bottom-[-2px] left-0 w-full h-px bg-gradient-to-r ${
        isDark ? "from-slate-600 to-blue-1000" : "from-slate-300 to-blue-50"
      }
        ${
          hasSolidBorder &&
          isDark &&
          "md:bg-slate-600 sm:bg-gradient-to-r sm:from-slate-600 to-blue-50"
        }
        ${
          hasSolidBorder &&
          !isDark &&
          "md:bg-slate-300 sm:bg-gradient-to-r sm:from-slate-300 to-blue-50"
        }`}
    />
  </div>
);
