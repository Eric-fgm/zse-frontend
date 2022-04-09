import React from "react";
import { getFileThumbnailSrc } from "utils/helpers";

export interface IFileThumbnailProps {
  type: string;
  alt?: string;
  size?: number;
}

const FileThumbnail: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > &
    IFileThumbnailProps
> = ({ type = "", alt = "obrazek", size = 16, ...props }) => {
  return (
    <img
      width={size}
      height={size}
      src={getFileThumbnailSrc(type, size)}
      alt={alt}
      {...props}
    />
  );
};

export default FileThumbnail;
