import axios from "axios";

export const userInstance = (token:null|string) => axios.create({
	baseURL: 'http://localhost:3001/api/v1/user/profile',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer ' + token,
	}
})