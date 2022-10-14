import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import React from 'react'

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers+
const initialState = {
	// le statut permet de suivre l'état de la requête
	status: 'void',
	// les données lorsque la requête a fonctionné
	data: null,
	// l'erreur lorsque la requête échoue
	error: null,
	// si l'user est connecté ou non
	logged: false,
	// infos personnelles de l'user
	user : {
		firstname: null,
		lastname: null,
		token: null
	}
}	
export const userSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// la requête est en cours
		fetching: (state: StateInterface) => {
			// si le statut est void on passe le status en pending
			if (state.status === 'void') {
				state.status = 'pending'
			}
			// si le statut est rejected on supprime l'erreur et on passe en pending
			if (state.status === 'rejected') {
				state.error = null
				state.status = 'pending'
			}
			// si le statut est resolved on passe en updating (requête en cours mais des données sont déjà présentes)
			if (state.status === 'resolved') {
				state.status = 'updating'
				state.logged = true
			}
		},
		// la requête a fonctionné
		resolved: (state: StateInterface, action: PayloadAction<{body: {token: string}}>) => {
			// si la requête est en cours on passe en resolved et on sauvegarde les données
			if (state.status === 'pending' || state.status === 'updating') {
				state.data = action.payload
				state.status = 'resolved'
				state.user.token = action.payload.body.token
			}
			// sinon l'action est ignorée
			return
		},
		// la requête a échoué
		rejected: (state: StateInterface, action: PayloadAction<string>) => {
			// si la requête est en cours on passe en rejected, on sauvegarde l'erreur et on supprime les données
			if (state.status === 'pending' || state.status === 'updating') {
				state.status = 'rejected'
				state.error = JSON.parse(action.payload)
				state.data = null
			}
			// sinon l'action est ignorée
			return
		},
		logOut: (state: StateInterface) => initialState,
		
	},
})

// actions creator
export const { fetching, resolved, rejected, logOut } = userSlice.actions

// ts interfaces

interface StateInterface {
	status: string
	data: null | {
		body: {
			token: string
		}
	}
	error: null | {
		error: AxiosError
		displayedError: null | string
	}
	logged: boolean
	user: {
		firstname: null | string
		lastname: null | string
		token: null | string
	}
}

// async fetching to get token
export const getToken = (userInfos : {email: string, password: string}) => async (dispatch:React.FC) => {
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
			dispatch(rejected(JSON.stringify({error, displayedError: 'incorrect email/password'})))
		}
	}	
}
