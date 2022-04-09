import { createContext } from "react";
import { TMediaQueriesBreakpoints } from "types";

export interface IThemeContextProps {
  isSidebarOpened: boolean;
  mediaQueries: TMediaQueriesBreakpoints;
  toggleSidebar: () => void;
  setSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<IThemeContextProps>({
  isSidebarOpened: true,
  mediaQueries: "sm",
  toggleSidebar: () => {},
  setSidebarOpened: () => {},
});

export default ThemeContext;
