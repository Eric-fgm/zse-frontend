import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import ThemeContex from "providers/theme/ThemeContext";
import {
  getMediaQueriesBreakpoint,
  getMediaQueriesMinWidth,
} from "utils/helpers";
import { TMediaQueriesBreakpoints } from "types";

export interface IThemeProviderProps {}

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [mediaQueries, setMediaQueries] = useState<TMediaQueriesBreakpoints>(
    getMediaQueriesBreakpoint(window.innerWidth)
  );
  const [isSidebarOpened, setSidebarOpened] = useState(
    getMediaQueriesMinWidth(mediaQueries) > 768
  );

  useEffect(() => {
    const onResize = debounce((e: Event) => {
      const windowInnerWidth = (e.target as Window).innerWidth;
      setMediaQueries(getMediaQueriesBreakpoint(windowInnerWidth));
    }, 300);

    window.addEventListener("resize", onResize, false);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpened((wasOpened) => !wasOpened);
  };
  const contextValue = {
    isSidebarOpened,
    mediaQueries,
    toggleSidebar,
    setSidebarOpened,
  };

  return (
    <ThemeContex.Provider value={contextValue}>{children}</ThemeContex.Provider>
  );
};

export default ThemeProvider;
