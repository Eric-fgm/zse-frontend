import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CopyWorkerList from "features/copyWorker/components/CopyWorkerList";
import Chip from "components/Chip/Chip";
import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";

export interface ICopyWorkerProps {}

const CopyWorker: React.FC<ICopyWorkerProps> = (props) => {
  const navigate = useNavigate();
  const { search } = useLocation();

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
      <Stack spacing={8} x="between" y="start" className="pt-4">
        <div>
          <Typography className="text-xl">Przeglądaj kopie robocze</Typography>
          <Stack spacing={16} className="mt-4">
            <Chip
              text="Opublikowane"
              onClick={handleChipClick("/copy-worker")}
              active={isActive()}
            />
            <Chip
              text="Przypięte"
              onClick={handleChipClick("/copy-worker?pinned=true")}
              active={isActive("?pinned=true")}
            />
          </Stack>
        </div>
      </Stack>
      <CopyWorkerList />
    </>
  );
};

export default CopyWorker;
