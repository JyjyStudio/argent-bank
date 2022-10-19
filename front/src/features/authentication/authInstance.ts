import axios from "axios";

export const AuthInstance = axios.create({
	baseURL: 'http://localhost:3001/api/v1/user/login',
	headers: {
		'accept': 'application/json',
		'Content-Type': 'application/json',
	}
})