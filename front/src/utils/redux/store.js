import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../features/auth/authSlice'

// creation et configuration du store 
export const store = configureStore({
	reducer: {
		authentication: authSlice.reducer,
	},
})
