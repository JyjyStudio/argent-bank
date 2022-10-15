import { configureStore, Store } from '@reduxjs/toolkit'
import { authenticationSlice } from '../../features/authentication/authenticationSlice'
import { userSlice } from '../../features/user/userSlice'

// creation et configuration du store
export const store: Store = configureStore({
	reducer: {
		authentication: authenticationSlice.reducer,
		userInfos: userSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
