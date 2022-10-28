import { useState, useEffect } from 'react'
import { IoMdLogIn } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../components/Input'
import createUser from '../features/user/createUser'

export default function SignUp() {
	//local state
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [validation, setValidation] = useState('')
	const [currentUser, setCurrentUser] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	})

	const navigate = useNavigate()

	useEffect(() => {
		setCurrentUser({
			email,
			password,
			firstName:firstname,
			lastName:lastname,
		})

	}, [email, firstname, lastname, password])
	

	// submit handler
	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {

		event.preventDefault()
		// check du password
		if((password.length || repeatPassword.length) < 6) {
			setValidation("Password is too short. (6 characters minimum).")
			return
		}
		else if(password !== repeatPassword) {
			setValidation("Password do not match.")
			return
		}

		const response = await createUser(currentUser)
		console.log('response:', response)
		if(response.status === 200) {
			setValidation(response.data)
			navigate('/signin')
		} else setValidation(response.data.message)
		
	}

	return (
		<Container>
				<FormContainer>
					<div>
						<IoMdLogIn size='2.5rem' />
						<h1>Sign Up</h1>
					</div>
					<form onSubmit={handleSubmit}>
						<Input type='firstname' name='firstname' value={firstname} setFunction={setFirstname} required/>
						<Input type='lastname' name='lastname' value={lastname} setFunction={setLastname} required/>
						<Input type='email' name='email' value={email} setFunction={setEmail} required/>
						<Input type='password' name='password' value={password} setFunction={setPassword} autoComplete="on" required/>
						<Input type='password' name='repeat-password' value={repeatPassword} setFunction={setRepeatPassword} autoComplete="on" required/>
						
						<SignUpButton type="submit">Sign Up</SignUpButton>
						<Error>{validation}</Error>
					</form>
				</FormContainer>
		</Container>
	)
}


const Container = styled.main`
	flex: 1;
	h1 {
		margin: 0.2rem 0;
	}
	label {
		font-weight: bold;
	}
	input {
		padding: 5px;
		font-size: 1.2rem;
	}
	input[type='checkbox'] {
		margin: 3px;
	}
`
const FormContainer = styled.section`
	background-color: white;
	color: black;
	width: 300px;
	margin: 0 auto;
	margin-top: 1rem;
	padding: 1rem 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 5px;
	border: 2px #34495e solid;
	img {
		margin: 0 auto;
	}
`

const SignUpButton = styled.button`
	color: #fff;
	display: block;
	width: 100%;
	padding: 8px;
	font-size: 1.1rem;
	font-weight: bold;
	margin-top: 1rem;
	border-color: #00bc77;
	background-color: #00bc77;
	cursor: pointer;
	border-radius: 3px;
`
const Error = styled.p`
	color: red;
	font-size: 1rem;
	margin-top: 1rem;
`
