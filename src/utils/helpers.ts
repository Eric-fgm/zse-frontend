import { EMediaQueries, TMediaQueriesBreakpoints } from "types";

export const getFileThumbnailSrc = (type: string, size: number) => {
  return `https://drive-thirdparty.googleusercontent.com/${size}/type/application/${type}`;
};

export const formatDate = (timestamp: number) => {
  const dateEntity = new Date(timestamp * 1000);
  return `${dateEntity.getDate()}/${dateEntity.getMonth()}/${dateEntity.getFullYear()}`;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getMediaQueriesMinWidth = (
  mediaQueries: TMediaQueriesBreakpoints
) => {
  return EMediaQueries[mediaQueries];
};

export const getMediaQueriesBreakpoint = (
  minWidth: number
): TMediaQueriesBreakpoints => {
  for (const property in EMediaQueries) {
    const breakpoint = property as TMediaQueriesBreakpoints;
    if (minWidth > EMediaQueries[breakpoint]) return breakpoint;
  }
  return "sm";
};
