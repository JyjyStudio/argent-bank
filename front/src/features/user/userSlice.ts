import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppDispatch } from '../../utils/redux/store'

interface InitialState {
	firstname: null | string
	lastname: null | string
}
interface User {
	body: {
		firstName: null | string
		lastName: null | string
	}
}

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers+
const initialState: InitialState = {
	firstname: null,
	lastname: null,
}
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getInfos: (state, action: PayloadAction<User>) => {
			state.firstname = action.payload.body.firstName
			state.lastname = action.payload.body.lastName
		},
		resetUser: (state) => initialState,
	},
})

// actions creator
export const { getInfos, resetUser } = userSlice.actions

// async fetching to user informations
export const asyncGetInfos = (token: string) => async (dispatch: AppDispatch) => {
	const headers = {
		accept: 'application/json',
		Authorization: 'Bearer ' + token,
	}

	try {
		const response = await axios.post('http://localhost:3001/api/v1/user/profile', token, { headers })
		dispatch(getInfos(response.data))
		
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			JSON.stringify({
				error,
				displayedError: 'incorrect email/password',
			})
		}
	}
}
