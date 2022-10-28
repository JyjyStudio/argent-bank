import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { userInstance } from './userInstance'
import axios from 'axios'

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers
const initialState: InitialState = {
	status: 'void',
	firstname: null,
	lastname: null,
}
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUser: (state) => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(getUserInfos.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(getUserInfos.fulfilled, (state, action: PayloadAction<Resolved>) => {
			state.status = 'resolved'
			state.firstname = action.payload.body.firstName
			state.lastname = action.payload.body.lastName
		})
		builder.addCase(getUserInfos.rejected, (state, action: PayloadAction<any>) => {
			state.status = 'rejected'
			console.log(action.payload) 
		})
		builder.addCase(editUser.fulfilled, (state, action: PayloadAction<Resolved>) => {
			state.status = 'resolved'
			state.firstname = action.payload.body.firstName
			state.lastname = action.payload.body.lastName
		})
		builder.addCase(editUser.rejected, (state, action) => {
			state.status = 'rejected'
			console.log(action.payload) 
		})
	},
})

export const { resetUser } = userSlice.actions 

export const getUserInfos = createAsyncThunk(
	'user/getInfos',
	async (token: Token, { rejectWithValue }) => {
		try {
			const response = await userInstance(token).post('')
			return response.data
		} catch (err) {
			if (axios.isAxiosError(err)) {
				return rejectWithValue(err.message)
			}
		}
	}
)

export const editUser = createAsyncThunk(
	'user/editUser',
	async (user: UserInfos, { rejectWithValue }) => {
		try {
			const response = await userInstance(user.token).put('', user.body)
			return response.data
		} catch (err) {
			if (axios.isAxiosError(err)) {
				return rejectWithValue(err.message)
			}
		}
	}
)

interface InitialState {
	status: string,
	firstname: null | string
	lastname: null | string
}

type Token = null | string

interface UserInfos {
	token: Token,
	body: {
		firstName: null | string,
		lastName: null | string
	}
}
interface Resolved {
	body: {
		firstName: string
		lastName: string
	}
}
