import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import { RootState } from '../../utils/redux/store'

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers+
const initialState = {
	status: 'void',
	response: null,
	error: null,
	logged: false,
	token: null,
}

export const authenticationSlice: RootState = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// la requête est en cours
		fetching: (state: RootState) => {
			// si le statut est void on passe le status en pending
			if (state.status === 'void') {
				state.status = 'pending'
			}
			// si le statut est rejected on supprime l'erreur et on passe en updating
			if (state.status === 'rejected') {
				state.error = null
				state.status = 'updating'
			}
			// si le statut est resolved on passe en updating (requête en cours mais des données sont déjà présentes)
			if (state.status === 'resolved') {
				state.status = 'updating'
				state.logged = true
			}
		},
		// la requête a fonctionné
		resolved: (state: RootState, action: PayloadAction<Resolved> ) => {
			// si la requête est en cours on passe en resolved et on sauvegarde les données
			if (state.status === 'pending' || state.status === 'updating') {
				state.status = 'resolved'
				state.response = action.payload
				state.token = action.payload.body.token
				state.logged = true
			}
		},
		// la requête a échoué
		rejected: (state: RootState, action: PayloadAction<string>) => {
			// si la requête est en cours on passe en rejected, on sauvegarde l'erreur
			if (state.status === 'pending' || state.status === 'updating') {
				state.status = 'rejected'
				state.error = JSON.parse(action.payload)
			}
		},
		resetAuth: (state: RootState) => initialState,
	},
})

// actions creator
export const { fetching, resolved, rejected, resetAuth } = authenticationSlice.actions

// async fetching to get token
export const asyncGetToken = (userInfos: UserInfos) => async (dispatch: React.FC) => {
	dispatch(fetching())

	const headers = {
		accept: 'application/json',
		'Content-Type': 'application/json',
	}

	try {

		const response = await axios.post('http://localhost:3001/api/v1/user/login', userInfos, { headers })
		dispatch(resolved(response.data))
		
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
		}
	}
}


interface Resolved { body: { token: string } }
interface UserInfos { email: string; password: string }