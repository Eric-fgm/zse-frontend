import React, { useCallback, useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import ThemeContext from "providers/theme/ThemeContext";
import { fetchSearchResults } from "features/navigation/navigationSlice";
import SearchResults from "features/navigation/components/SearchResults";
import Icon from "components/Icon/Icon";
import Logo from "components/Logo/Logo";
import SearchInput from "components/SearchInput/SearchInput";
import Stack from "components/Stack/Stack";
import SolidMenu from "icons/SolidMenu";
import SolidSettings from "icons/SolidSettings";
import SolidHelp from "icons/SolidHelp";
import SolidSearch from "icons/SolidSearch";
import SolidCross from "icons/SolidCross";

export interface INavigationProps {}

const Navigation: React.FC<INavigationProps> = (props) => {
  const dispatch = useDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { toggleSidebar } = useContext(ThemeContext);

  const [isResultsOpened, setResultsOpened] = useState(false);
  const [isMobileSearchOpened, setMobileSearchOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleInputFocus = () => {
    setResultsOpened(true);
  };

  const handleInputBlur = () => {
    setResultsOpened(false);
  };

  const handleMobileSearchClick = async () => {
    await setMobileSearchOpened(true);
    searchInputRef.current?.focus();
  };

  const handleMobileSearchClose = () => {
    setMobileSearchOpened(false);
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      dispatch(fetchSearchResults("?q=" + value));
    }, 200),
    []
  );

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);
    handleSearch(target.value);
  };

  return (
    <nav className="relative px-2.5 flex items-center h-16 bg-elevation-primary border-b border-b-modifier-primary z-40 lg:px-4">
      <Stack spacing={8} x="start" className="pr-4 flex-shrink-0 lg:w-58">
        <Icon content={<SolidMenu />} interactive onClick={toggleSidebar} />
        <Logo />
      </Stack>
      <div
        className={`absolute left-0 px-2 w-full max-w-180 bg-elevation-primary sm:relative sm:block sm:px-0 ${
          isMobileSearchOpened ? "block" : "hidden"
        }`}
      >
        <Stack
          spacing={0}
          y="center"
          className="relative flex-1 bg-elevation-secondary rounded-lg"
        >
          <SearchInput
            ref={searchInputRef}
            id="navigation-search"
            placeholder="Szukaj plików"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <Icon
            content={<SolidCross />}
            size={48}
            type="dark"
            className="-ml-3 flex-shrink-0 sm:hidden"
            interactive
            onClick={handleMobileSearchClose}
          />
          {isResultsOpened && <SearchResults />}
        </Stack>
      </div>
      <Stack spacing={8} className="ml-auto pl-4">
        <Icon
          content={<SolidSearch />}
          className="sm:hidden"
          interactive
          onClick={handleMobileSearchClick}
        />
        <Icon content={<SolidSettings />} interactive />
        <Icon content={<SolidHelp />} interactive />
      </Stack>
    </nav>
  );
};

export default Navigation;
