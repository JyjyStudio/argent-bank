import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers
const initialState: InitialState = {
	status: 'void',
	firstname: null,
	lastname: null,
}
export const userSliceV2 = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUser: (state) => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(getUserInfos.pending, (state, action) => {
			state.status = 'pending'
		})
		builder.addCase(getUserInfos.fulfilled, (state, action) => {
			state.status = 'resolved'
			state.firstname = action.payload.body.firstName
			state.lastname = action.payload.body.lastName
		})
		builder.addCase(getUserInfos.rejected, (state, action) => {
			state.status = 'rejected'
			console.log(action.payload) 
		})
		builder.addCase(editUser.fulfilled, (state, action) => {
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

export const { resetUser } = userSliceV2.actions 

export const getUserInfos = createAsyncThunk(
	'user/getInfos',
	async (token: Token, { rejectWithValue }) => {
		const headers = {
			accept: 'application/json',
			Authorization: 'Bearer ' + token,
		}

		try {
			const response = await axios.post(
				'http://localhost:3001/api/v1/user/profile',
				token,
				{ headers }
			)
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
		const headers = {
			accept: 'application/json',
			Authorization: 'Bearer ' + user.token,
		}

		try {
			const response = await axios.put(
				'http://localhost:3001/api/v1/user/profile',
				user.body,
				{ headers }
			)
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
	token: null | string,
	body: {
		firstName: null | string,
		lastName: null | string
	}
}