import { combineReducers } from "@reduxjs/toolkit";
import filesReducer from "features/files/filesSlice";
import copyWorkerReducer from "features/copyWorker/copyWorkerSlice";
import mailerReducer from "features/mailer/mailerSlice";
import navigationReducer from "features/navigation/navigationSlice";

export default combineReducers({
  files: filesReducer,
  copyWorker: copyWorkerReducer,
  mailer: mailerReducer,
  navigation: navigationReducer,
});
