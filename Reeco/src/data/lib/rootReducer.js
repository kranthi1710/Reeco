import { combineReducers } from "@reduxjs/toolkit";
import { ReecoReducer } from "./Slices";
const reducer = combineReducers({
  ReecoDetails: ReecoReducer,
});
export default reducer;
