import { RootState } from "../../utils/redux/store";

export const getAuthenticationResponse = (state: RootState) => state.authentication

export const getStatus = (state: RootState) => state.authentication.status

export const getResponse = (state: RootState) => state.authentication.response

export const getTokenFromState = (state: RootState) => state.authentication.token
