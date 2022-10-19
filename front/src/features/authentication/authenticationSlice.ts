import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { AppDispatch } from '../../utils/redux/store'
import { AuthInstance } from './authInstance'

interface Resolved {
	status: number,
	message: string,
	body: {token: string}
}
interface Rejected {
	error?: AxiosError
	displayedError?: string
}
interface UserCredentials { email: string; password: string }

interface InitialState {
	status: string
	response: null | Resolved & Rejected
	token: null | string
}

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
		// la requête est en cours
		fetching: (state) => {
			// si le statut est void on passe le status en pending
			if (state.status === 'void') {
				state.status = 'pending'
			}
			// si le statut est rejected on supprime l'erreur et on passe en updating
			if (state.status === 'rejected') {
				state.response = null
				state.status = 'pending'
			}
			// si le statut est resolved on passe en updating (requête en cours mais des données sont déjà présentes)
			if (state.status === 'resolved') {
				state.status = 'updating'
			}
		},
		// la requête a fonctionné
		resolved: (state, action: PayloadAction<Resolved> ) => {
			// si la requête est en cours on passe en resolved et on sauvegarde les données
			if (state.status === 'pending' || state.status === 'updating') {
				state.status = 'resolved'
				state.response = action.payload
				state.token = action.payload.body.token
			}
		},
		// la requête a échoué
		rejected: (state, action: PayloadAction<string>) => {
			// si la requête est en cours on passe en rejected, on sauvegarde l'erreur
			if (state.status === 'pending' || state.status === 'updating') {
				state.status = 'rejected'
				state.response = JSON.parse(action.payload)
			}
		},
		resetAuth: (state) => initialState,
	},
})

// actions creator
export const { fetching, resolved, rejected, resetAuth } = authenticationSlice.actions

// async fetching to get token
export const asyncGetToken = (userInfos: UserCredentials) => async (dispatch: AppDispatch) => {
	dispatch(fetching())

	try {
		const response = await AuthInstance.post('', userInfos)
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
