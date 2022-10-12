import { createSlice } from '@reduxjs/toolkit'

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers+
export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		// le statut permet de suivre l'état de la requête
		status: 'void',
		// les données lorsque la requête a fonctionné
		data: null,
		// l'erreur lorsque la requête échoue
		error: null,
		logged: false
	},
	reducers: {
		// la requête est en cours
		fetching: (state) => {
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
			}
			// sinon l'action est ignorée 
			return
		},
		// la requête a fonctionné
		resolved: (state, action) => {
			// si la requête est en cours on passe en resolved et on sauvegarde les données
			if (state.status === 'pending' || state.status === 'updating') {
				state.data = action.payload
				state.status = 'resolved'
			}
			// sinon l'action est ignorée
			return
		},
		// la requête a échoué
		rejected: (state, action) => {
			// si la requête est en cours on passe en rejected, on sauvegarde l'erreur et on supprime les données
			if (state.status === 'pending' || state.status === 'updating') {
				state.status = 'rejected'
				state.error = JSON.parse(action.payload)
				state.data = null
			}
			// sinon l'action est ignorée
			return
		},
		logIn: (state) => {
			state.logged = true
		},
		logOut: (state) => {
			state.logged = false
		}
	},
})

// actions creator
export const { fetching, resolved, rejected, logIn, logOut } = authSlice.actions
