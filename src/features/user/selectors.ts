import { RootState } from "../../utils/redux/store";

export const getUserInfosFromState = (state: RootState) => state.userInfos

export const getUserInfosStatus = (state: RootState) => state.userInfos.status
