export const API_URL = "https://api-zse.herokuapp.com";
//export const API_URL = "http://localhost:3001";

export const GMAIL_RESTRICTIONS: {
  bytes: 25165824;
  extensions: { [key: string]: true };
} = {
  bytes: 25165824,
  extensions: {
    "text/csv": true,
    "application/msword": true,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      true,
    "image/gif": true,
    "image/jpeg": true,
    "audio/mpeg": true,
    "video/mp4": true,
    "application/vnd.oasis.opendocument.presentation": true,
    "image/png": true,
    "application/pdf": true,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      true,
    "application/vnd.ms-powerpoint": true,
    "application/vnd.rar": true,
    "image/svg+xml": true,
    "application/x-tar": true,
    "text/plain": true,
    "application/vnd.ms-excel": true,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": true,
  },
};
