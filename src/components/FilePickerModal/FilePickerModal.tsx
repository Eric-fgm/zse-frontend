import React, { useMemo } from "react";
import Modal from "react-modal";
import Icon from "components/Icon/Icon";
import Scroller from "components/Scroller/Scroller";
import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";
import { fetchFiles, selectFiles } from "features/files/filesSlice";
import useQuery from "hooks/useQuery";
import SolidCross from "icons/SolidCross";
import SolidLoader from "icons/SolidLoader";
import BoxFile from "components/BoxFile/BoxFile";

export interface IFilePickerModalProps {
  value: string | string[];
  isOpen: boolean;
  setIsOpen?: (payload: boolean) => void;
  onChange?: (e: any) => void;
}

const customStyles = {
  content: {
    padding: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxWidth: 900,
    maxHeight: 800,
    width: "100%",
    height: "100%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--background-primary)",
    border: "none",
  },
  overlay: {
    backgroundColor: "#00000093",
  },
};

const FilePickerModal: React.FC<IFilePickerModalProps> = ({
  value = [],
  isOpen,
  setIsOpen,
  onChange,
}) => {
  const { isLoading, files } = useQuery(fetchFiles, selectFiles);

  const selectedEntities = useMemo(() => {
    const output: { [key: string]: boolean } = {};
    for (let i = 0; i < value.length; i++) {
      const id = value[i];
      output[id] = true;
    }
    return output;
  }, [value]);

  const handleBoxFileClick = (id: number) => () => {
    const parsedId = id.toString();
    let payload = Array.isArray(value) ? [...value] : [value];
    if (selectedEntities[id])
      payload = payload.filter((currId) => currId !== parsedId);
    else payload.push(parsedId);
    onChange && onChange({ target: { value: payload } });
  };

  const closeModal = () => {
    setIsOpen && setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <Stack spacing={0} direction="column" className="w-full h-full">
        <Stack
          x="between"
          y="center"
          className="pl-4 flex-shrink-0 w-full h-16 border-b border-modifier-primary"
        >
          <Typography variant="h3" className="text-lg">
            Prześlij pliki
          </Typography>
          <Icon
            size={48}
            content={<SolidCross />}
            interactive
            onClick={closeModal}
          />
        </Stack>
        {isLoading ? (
          <Stack x="center" y="center" className="w-full h-full">
            <Icon content={<SolidLoader />} />
          </Stack>
        ) : (
          <>
            <Scroller className="pl-4 py-4 w-full">
              <Stack spacing={0} className="flex-wrap">
                {files.map((fileProps) => (
                  <BoxFile
                    key={fileProps.id}
                    isActive={selectedEntities[fileProps.id]}
                    onClick={handleBoxFileClick(fileProps.id)}
                    {...fileProps}
                  />
                ))}
              </Stack>
            </Scroller>
            {/* <Stack
              y="center"
              className="px-4 py-2 flex-shrink-0 w-full h-16 border-t border-modifier-primary"
            >
              {!!selectedEntitiesCount && (
                <Typography.Span className="text-rg text-primary">
                  Wybrane: {selectedEntitiesCount}
                </Typography.Span>
              )}
              <SubmitButton
                text="Dołącz"
                className="ml-auto"
                onClick={() =>
                  onChange &&
                  onChange({ target: { value: Object.keys(selectedEntities) } })
                }
              />
            </Stack> */}
          </>
        )}
      </Stack>
    </Modal>
  );
};

Modal.setAppElement("#modal-root");

export default FilePickerModal;
