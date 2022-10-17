import { RootState } from "../../utils/redux/store";

export const getAuthenticationResponse = (state: RootState) => state.authentication

export const getStatus = (state: RootState) => state.authentication.status

export const getErrorMsg = (state: RootState) => state.authentication.response?.displayedError

export const getTokenFromState = (state: RootState) => state.authentication.token
