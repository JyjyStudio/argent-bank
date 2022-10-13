export const getAuthenticationResponse = (state) => state.authentication

export const getStatus = (state) => state.authentication.status

export const getTokenState = (state) => state.authentication.user.token
