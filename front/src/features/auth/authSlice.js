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
	},
	reducers: {
		// la requête est en cours
		fetching: (state) => {
			// si le statut est void
			if (state.status === 'void') {
				// on passe en pending
				state.status = 'pending'
			}
			// si le statut est rejected
			if (state.status === 'rejected') {
				// on supprime l'erreur et on passe en pending
				state.error = null
				state.status = 'pending'
			}
			// si le statut est resolved
			if (state.status === 'resolved') {
				// on passe en updating (requête en cours mais des données sont déjà présentent)
				state.status = 'updating'
			}
			// sinon l'action est ignorée
			return
		},
		// la requête a fonctionné
		resolved: (state, action) => {
			// si la requête est en cours
			if (state.status === 'pending' || state.status === 'updating') {
				// on passe en resolved et on sauvegarde les données
				state.data = action.payload
				state.status = 'resolved'
				return
			}
			// sinon l'action est ignorée
			return
		},
		// la requête a échoué
		rejected: (state, action) => {
			// si la requête est en cours
			if (state.status === 'pending' || state.status === 'updating') {
				// on passe en rejected, on sauvegarde l'erreur et on supprime les données
				state.status = 'rejected'
				state.error = JSON.parse(action.payload)
				state.data = null
				return
			}
			// sinon l'action est ignorée
			return
		},
	},
})

// actions creator
export const { fetching, resolved, rejected } = authSlice.actions
