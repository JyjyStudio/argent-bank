import axios from 'axios'

export default async function createUser(newUser: CreateUser) {

	try {
		const response = await axios.post('http://localhost:3001/api/v1/user/signup', newUser)
		return response.data
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return err.response
		}
	}
}

interface CreateUser {
	email: string
	password: string
	firstName: string
	lastName: string
}
