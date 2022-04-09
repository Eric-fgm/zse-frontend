import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FilesList from "features/files/components/FilesList";
import UploadButton from "components/UploadButton/UploadButton";
import Chip from "components/Chip/Chip";
import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";
import { useDispatch } from "react-redux";
import { uploadFileRequest } from "../filesSlice";
import Dropzone from "components/Dropzone/Dropzone";

export interface IFilesProps {}

const Files: React.FC<IFilesProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const [isDropzoneVisible, setDropzoneVisible] = useState(false);

  useEffect(() => {
    const onDragEnter = (event: any) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.currentTarget.contains(event.relatedTarget)) return;
      setDropzoneVisible(true);
    };
    const onDragLeave = (event: any) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.currentTarget.contains(event.relatedTarget)) return;
      setDropzoneVisible(false);
    };
    const onDrop = (event: any) => {
      event.stopImmediatePropagation();
      setDropzoneVisible(false);
    };
    document.addEventListener("dragenter", onDragEnter, false);
    document.addEventListener("dragleave", onDragLeave, false);
    document.addEventListener("drop", onDrop, false);
    return () => {
      document.removeEventListener("dragenter", onDragEnter);
      document.removeEventListener("dragleave", onDragLeave);
      document.removeEventListener("drop", onDrop);
    };
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await dispatch(uploadFileRequest(file));
    }
    e.target.value = "";
  };

  const handleChipClick =
    (to: string = "/") =>
    () => {
      navigate(to);
    };

  const isActive = (to: string = "") => {
    return to === search;
  };

  return (
    <>
      <div className="pt-4">
        <Stack x="between">
          <Typography className="text-xl">Przeglądaj pliki</Typography>
          <UploadButton text="PRZEŚLIJ PLIKI" onFileChange={handleUpload} />
        </Stack>
        <Stack spacing={16} className="mt-2">
          <Chip
            text="Opublikowane"
            onClick={handleChipClick()}
            active={isActive()}
          />
          <Chip
            text="Przypięte"
            onClick={handleChipClick("/?pinned=true")}
            active={isActive("?pinned=true")}
          />
        </Stack>
      </div>
      <FilesList />
      <Dropzone visible={isDropzoneVisible} onChange={handleUpload} />
    </>
  );
};

export default Files;
