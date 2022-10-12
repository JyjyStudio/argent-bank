import { fetching, rejected, resolved, logIn } from './authSlice'
import axios from 'axios'

export function checkUser(store, email, password) {

	// ici on indique que la requête est en cours
	store.dispatch(fetching())

	const userInfos = {
		email,
		password,
	}
	const headers = {
		'accept': 'application/json',
		'Content-Type': 'application/json',
	}
	
	axios
		.post('http://localhost:3001/api/v1/user/login', userInfos, { headers })
		.then((response) => {
			localStorage.setItem('userToken', response.data.body.token)
			// si la requête fonctionne, on envoie les données à redux avec l'action resolved avec comme payload la data reçue (notamment le token)
			store.dispatch(resolved(response.data))
			store.dispatch(logIn())
		})
		.catch((error) => {
			// en cas d'erreur on envoie l'action rejected avec comme payload le message d'erreur d'axios + celui à afficher sur le formulaire
			store.dispatch(
				rejected(
					JSON.stringify({
						error,
						displayedError: 'incorrect email/password',
					})
				)
			)
		})
}
