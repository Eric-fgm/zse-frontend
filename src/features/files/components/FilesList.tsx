import React from "react";
import { useDispatch } from "react-redux";
import Table from "components/Table/Table";
import FileThumbnail from "features/files/components/FileThumbnail";
import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";
import { TFile } from "features/files/types";
import { formatBytes, formatDate } from "utils/helpers";
import { deleteFiles, fetchFiles, selectFiles, pinFile } from "../filesSlice";
import useQuery from "hooks/useQuery";
import { API_URL } from "lib/axios";
import OptionsPopover from "./OptionsPopover";

export interface IFilesListProps {}

const FilesList: React.FC<IFilesListProps> = (props) => {
  const dispatch = useDispatch();
  const { isLoading, files } = useQuery(fetchFiles, selectFiles);

  const handleDelete = (id: number) => () => {
    dispatch(deleteFiles([id]));
  };

  const handlePin = (id: number) => () => {
    dispatch(pinFile(id));
  };

  return (
    <>
      <Table<TFile>
        columns={[
          {
            id: "name",
            title: "Nazwa",
            size: "min-w-22 flex-1",
            cell: ({ path, type, name, cellSize }) => (
              <Stack
                spacing={16}
                x="start"
                className={`pl-2 overflow-hidden ${cellSize}`}
              >
                <FileThumbnail type={type} className="px-0.5" />
                <Typography variant="h4" className="text-rg truncate">
                  <a href={`${API_URL}/${path}`} rel="noreferrer">
                    {name}
                  </a>
                </Typography>
              </Stack>
            ),
          },
          {
            id: "size",
            title: "Rozmiar",
            size: "min-w-22 basis-16p",
            cell: ({ id, size, cellSize }) => (
              <Typography
                id={id.toString()}
                variant="h4"
                className={`text-rg truncate ${cellSize}`}
              >
                {formatBytes(size)}
              </Typography>
            ),
          },
          {
            id: "dateCreated",
            title: "Data dodania",
            size: "min-w-22 basis-16p",
            cell: ({ dateCreated, cellSize }) => (
              <Typography
                variant="h4"
                className={`text-rg truncate ${cellSize}`}
              >
                {formatDate(dateCreated)}
              </Typography>
            ),
          },
          {
            id: "menu",
            title: "",
            size: "w-8",
            cell: ({ id, isPinned }) => (
              <OptionsPopover
                options={[
                  {
                    text: isPinned ? "Odepnij" : "Przypnij",
                    onClick: handlePin(id),
                  },
                  { highlight: true, text: "Usuń", onClick: handleDelete(id) },
                ]}
              />
            ),
          },
        ]}
        data={files}
        className="mt-1"
        isLoading={isLoading}
      />
    </>
  );
};

export default FilesList;
