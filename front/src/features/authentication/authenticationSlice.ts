import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authInstance } from './authInstance'
import axios from 'axios'

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers+
const initialState: InitialState = {
	status: 'void',
	response: null,
	token: null,
}

export const authenticationSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetAuth: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(getToken.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(getToken.fulfilled, (state, action: PayloadAction<Resolved>) => {
			state.status = 'resolved'
			state.response = action.payload
			state.token = action.payload.body.token
		})
		builder.addCase(getToken.rejected, (state, action: PayloadAction<any>) => {
			state.status = 'rejected'
			state.response = action.payload
			console.log(action.payload)
		})
	},
})

// actions creator
export const { resetAuth } = authenticationSlice.actions

// async fetching to get token
export const getToken = createAsyncThunk(
	'auth/getToken',
	async (userInfos: UserCredentials, { rejectWithValue }) => {
		try {
			const response = await authInstance.post('', userInfos)
			return response.data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data.message)
			}
		}
	}
)

interface Resolved {
	status: number
	message: string
	body: { token: string }
}
interface UserCredentials {
	email: string
	password: string
}
interface InitialState {
	status: string
	response: any
	token: null | string
}
