import styled from 'styled-components'
import Img from '../components/Img'
import SignInIcon from '../assets/icon-login.png'
import Loader from '../components/Loader'
import React, { useState, useEffect } from 'react'
import { useTsSelector, useTsDispatch } from '../utils/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../features/authentication/authenticationSlice'
import { getStatus, getResponse, getTokenFromState } from '../features/authentication/selectors'

/**
 * login page
 * @name Profile
 * @component
 * @returns {JSX.Element} the login page.
 */
export default function Login():JSX.Element {
	//local state
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)

	// redux state & token
	const userToken = useTsSelector(getTokenFromState)
	const status = useTsSelector(getStatus)
	const displayedError = useTsSelector(getResponse)
	const loading: boolean = status === 'pending'

	// redirect to profil page if userToken exists
	const navigate = useNavigate()
	const dispatch = useTsDispatch()

	useEffect(() => {
		userToken && navigate('/profile')
	}, [userToken, navigate])

	// submit handler
	const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(getToken({ email, password }))
	}

	// view
	return (
		<Container>
			{loading && <Loader bottom="20%" />}
			{!userToken && (
				<FormContainer>
					<div>
						<Img src={SignInIcon} alt="Sign In icon" width="30px" />
						<h1>Sign In</h1>
					</div>
					<form onSubmit={handleSubmit}>
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

						<SignInButton type="submit">Sign In</SignInButton>
						<Error>{displayedError && displayedError}</Error>
					</form>
				</FormContainer>
			)}
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
	border-radius: 5px;
	img {
		margin: 0 auto;
	}
`
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	margin-bottom: 1rem;
	border-radius: 3px;
	label {
		margin-bottom: 7px;
	}
`
const CheckboxContainer = styled.div`
	display: flex;
`
const SignInButton = styled.button`
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
	text-decoration: underline;
`
const Error = styled.p`
	color: red;
	font-size: 1rem;
	margin-top: 1rem;
`
