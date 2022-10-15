import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import { RootState } from '../../utils/redux/store'

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers+
const initialState = {
	firstname: null,
	lastname: null,
}
export const userSlice: RootState = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getInfos: (state: RootState,  action: PayloadAction<GetInfos>) => {
			state.firstname = action.payload.body.firstName
			state.lastname = action.payload.body.lastName
		},
		resetUser: (state: RootState) => initialState,
	},
})

// actions creator
export const { rejected, getInfos, resetUser } = userSlice.actions

// async fetching to user informations
export const asyncGetInfos = (token: string) => async (dispatch: React.FC) => {

	const headers = {
		accept: 'application/json',
		Authorization: 'Bearer ' + token,
	}

	try {
		const response = await axios.post('http://localhost:3001/api/v1/user/profile', token, { headers })
		dispatch(getInfos(response.data))
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			dispatch(
				rejected(
					JSON.stringify({
						error,
						displayedError: 'incorrect email/password',
					})
				)
				)
				console.log('error from userSlice')
		}
	}
}

interface GetInfos {
	body: { 
		firstName: string,
		lastName: string
	}
}