import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileThumbnail from "features/files/components/FileThumbnail";
import SearchResultHint from "features/navigation/components/SearchResultHint";
import { selectHints } from "features/navigation/navigationSlice";
import { changeField, setCurrentStep } from "features/mailer/mailerSlice";
import Typography from "components/Typography/Typography";
import Icon from "components/Icon/Icon";
import SolidBookmarks from "icons/SolidBookmarks";
import SolidLoader from "icons/SolidLoader";
import { API_URL } from "utils/constants";

export interface ISearchResultsProps {}

const SearchResults: React.FC<ISearchResultsProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, files, copyWorker } = useSelector(selectHints);

  const handleFileHintClick = (path: string) => () => {
    window.location.replace(path);
  };

  const handleCopyWorkerHintClick =
    ({ recipient, topic }: { recipient: string; topic: string }) =>
    async () => {
      await dispatch(changeField({ name: "recipient", value: recipient }));
      await dispatch(changeField({ name: "topic", value: topic }));
      await dispatch(setCurrentStep(2));
      navigate("/mailer");
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
                  onClick={handleFileHintClick(`${API_URL}/${path}`)}
                />
              ))}
            </>
          )}
          {!!copyWorker.length && (
            <>
              <Typography.Span className="py-2 px-4 text-rg text-content-secondary">
                Kopia robocza
              </Typography.Span>
              {copyWorker.map(({ id, topic, recipient }) => (
                <SearchResultHint
                  key={id}
                  icon={
                    <SolidBookmarks
                      width={18}
                      className="mx-px flex-shrink-0 text-content-secondary"
                    />
                  }
                  text={topic}
                  onClick={handleCopyWorkerHintClick({ recipient, topic })}
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
