import styled from 'styled-components'
import Img from '../components/Img'
import SignInIcon from '../assets/icon-login.png'
import StyledLink from '../components/StyledLink'
import { useState } from 'react'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)

	const postData = (e) => {
		e.preventDefault()
		console.log(email, password, rememberMe)
	}

	return (
		<Container>
			<FormContainer onSubmit={(e) => postData(e)}>
				<Img src={SignInIcon} alt="Sign In icon" width="30px" />
				<h1>Sign In</h1>
				<form>
					<InputContainer>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							autoComplete="on"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value)
							}}
						/>
					</InputContainer>
					<CheckboxContainer>
						<input
							type="checkbox"
							id="remember-me"
							onClick={() => {
								setRememberMe(!rememberMe)
							}}
						/>
						<label htmlFor="remember-me">Remember me</label>
					</CheckboxContainer>

					<SignInButton type="submit" value="Sign In" />
				</form>
			</FormContainer>
		</Container>
	)
}

const Container = styled.main`
	background-color: #12002b;
	flex: 1;
	h1 {
		margin: 0.83rem 0;
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
	label:nth-last-child(1) {
		margin-left: 0.25rem;
		font-weight: initial;
	}
`
const FormContainer = styled.section`
	background-color: white;
	width: 300px;
	margin: 0 auto;
	margin-top: 3rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	img {
		margin: 0 auto;
	}
`
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	margin-bottom: 1rem;
`
const CheckboxContainer = styled.div`
	display: flex;
`
const SignInButton = styled.input`
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
	border: none;
	text-decoration: underline;
`
