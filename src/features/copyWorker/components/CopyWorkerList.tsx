import React from "react";
import { useDispatch } from "react-redux";
import Stack from "components/Stack/Stack";
import Table from "components/Table/Table";
import Typography from "components/Typography/Typography";
import { TCopyWorker } from "features/copyWorker/types";
import CheckboxInput from "components/CheckboxInput/CheckboxInput";
import SelectHeadingRow from "./SelectHeadingRow";
import useQuery from "hooks/useQuery";
import useSelect from "hooks/useSelect";
import {
  fetchCopyWorker,
  selectCopyWorker,
  deleteCopyWorker,
  pinCopyWorker,
} from "../copyWorkerSlice";
import { formatDate } from "utils/helpers";

export interface ICopyWorkerListProps {}

const CopyWorkerList: React.FC<ICopyWorkerListProps> = (props) => {
  const dispatch = useDispatch();
  const { isLoading, copyWorker } = useQuery(fetchCopyWorker, selectCopyWorker);
  const {
    selectedEntities,
    selectedEntitiesCount,
    handleSelect,
    handleUnselectAll,
  } = useSelect();

  const handleDelete = async () => {
    dispatch(deleteCopyWorker(Object.keys(selectedEntities)));
    handleUnselectAll();
  };

  const handlePin = async () => {
    dispatch(pinCopyWorker(Object.keys(selectedEntities).join()));
    handleUnselectAll();
  };

  return (
    <Table<TCopyWorker>
      columns={[
        {
          id: "name",
          title: "Nazwa",
          size: "min-w-41 basis-24p",
          cell: ({ id, recipient, cellSize }) => (
            <Stack
              spacing={16}
              x="start"
              className={`pl-2 overflow-hidden ${cellSize}`}
            >
              <CheckboxInput
                checked={selectedEntities[id]}
                onChange={handleSelect(id)}
              />
              <Typography className="text-rg truncate">{recipient}</Typography>
            </Stack>
          ),
        },
        {
          id: "content",
          title: "Treść",
          size: "flex-1",
          cell: ({ topic, content, cellSize }) => (
            <Typography className={`text-rg truncate ${cellSize}`}>
              <span>{topic}</span>
              {" - "}
              <span className="text-content-secondary font-normal">
                {content}
              </span>
            </Typography>
          ),
        },
        {
          id: "dateCreated",
          title: "Data dodania",
          size: "min-w-22 basis-16p",
          cell: ({ dateCreated, cellSize }) => (
            <Typography className={`text-rg truncate ${cellSize}`}>
              {formatDate(dateCreated)}
            </Typography>
          ),
        },
      ]}
      data={copyWorker}
      customHeadingRow={
        !!selectedEntitiesCount ? (
          <SelectHeadingRow
            selectCount={selectedEntitiesCount}
            onUnselectAll={handleUnselectAll}
            onDelete={handleDelete}
            onPin={handlePin}
          />
        ) : undefined
      }
      className="mt-1"
      isLoading={isLoading}
    />
  );
};

export default CopyWorkerList;
