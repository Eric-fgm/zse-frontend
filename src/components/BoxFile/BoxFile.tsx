import React from "react";
import { TFile } from "features/files/types";
import FileThumbnail from "features/files/components/FileThumbnail";
import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";
import { formatBytes } from "utils/helpers";

export interface IBoxFileProps extends TFile {
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const BoxFile: React.FC<IBoxFileProps> = ({
  id,
  type,
  name,
  size,
  isActive = false,
  isDisabled = false,
  onClick,
}) => {
  return (
    <div
      key={id}
      className={`p-1 w-1/2 cursor-pointer sm:w-1/3 lg:w-1/4 ${
        isDisabled ? "opacity-50 pointer-events-none" : ""
      }`}
      onClick={onClick}
    >
      <div className="border border-modifier-primary rounded-lg overflow-hidden">
        <div className="py-4">
          <FileThumbnail type={type} size={64} className="mx-auto" />
        </div>
        <div
          className={`px-4 py-3 border-t border-modifier-primary ${
            isActive ? "bg-elevation-secondary" : ""
          }`}
        >
          <Stack spacing={8}>
            <FileThumbnail type={type} />
            <Typography.Span className="text-rg truncate">
              {name}
            </Typography.Span>
          </Stack>
          <Typography.Subhead className="mt-1 text-rg truncate">
            Rozmiar: {formatBytes(size)}
          </Typography.Subhead>
        </div>
      </div>
    </div>
  );
};

export default BoxFile;
