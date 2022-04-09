import React from "react";
import { useSelector } from "react-redux";
import Typography from "components/Typography/Typography";
import FileThumbnail from "features/files/components/FileThumbnail";
import SolidBookmarks from "icons/SolidBookmarks";
import SearchResultHint from "./SearchResultHint";
import { selectHints } from "../navigationSlice";
import Icon from "components/Icon/Icon";
import SolidLoader from "icons/SolidLoader";
import { API_URL } from "lib/axios";

export interface ISearchResultsProps {}

const SearchResults: React.FC<ISearchResultsProps> = (props) => {
  const { isLoading, files, copyWorker } = useSelector(selectHints);

  const handleHintClick = (path: string) => () => {
    window.location.replace(path);
  };

  return (
    <div
      className="absolute -mt-1 pt-3 pb-2 top-full w-full bg-elevation-secondary rounded-b-lg"
      onMouseDown={(event) => event.preventDefault()}
    >
      {isLoading ? (
        <Icon content={<SolidLoader />} className="mx-auto py-12" />
      ) : (
        <>
          {!!files.length && (
            <>
              <Typography.Span className="py-2 px-4 text-rg text-content-secondary">
                Pliki
              </Typography.Span>
              {files.map(({ id, name, type, path }) => (
                <SearchResultHint
                  key={id}
                  icon={
                    <FileThumbnail
                      type={type}
                      className="mx-0.5 flex-shrink-0"
                    />
                  }
                  text={name}
                  onClick={handleHintClick(`${API_URL}/${path}`)}
                />
              ))}
            </>
          )}
          {!!copyWorker.length && (
            <>
              <Typography.Span className="py-2 px-4 text-rg text-content-secondary">
                Kopia robocza
              </Typography.Span>
              {copyWorker.map(({ id, topic }) => (
                <SearchResultHint
                  key={id}
                  icon={
                    <SolidBookmarks
                      width={18}
                      className="mx-px flex-shrink-0 text-content-secondary"
                    />
                  }
                  text={topic}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
