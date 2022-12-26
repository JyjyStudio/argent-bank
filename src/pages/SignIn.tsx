import styled from 'styled-components'
import Loader from '../components/Loader'
import React, { useState, useEffect } from 'react'
import { useTsSelector, useTsDispatch } from '../utils/redux/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { getToken } from '../features/authentication/authenticationSlice'
import { getStatus, getResponse, getTokenFromState } from '../features/authentication/selectors'
import { FaUserAstronaut } from 'react-icons/fa';
import Input from '../components/Input'

/**
 * Signin page
 * @name SignIn
 * @component
 * @returns {JSX.Element} the signin page.
 */
export default function SignIn():JSX.Element {
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
			{loading && <Loader bottom="18%" />}
			{!userToken && (
				<FormContainer>
					<div>
						<FaUserAstronaut size='2rem' />
						<h1>Sign In</h1>
					</div>
					<form onSubmit={handleSubmit}>

						<Input type='email' name='email' value={email} setFunction={setEmail} required/>
						<Input type='password' name='password' value={password} setFunction={setPassword} autoComplete="on" required/>
						<CheckboxContainer>
							<input type="checkbox" id="remember-me" onClick={() => { setRememberMe(!rememberMe) }} />
							<label htmlFor="remember-me">Remember me</label>
						</CheckboxContainer>

						<SignInButton type="submit">Sign In</SignInButton>
						<Error>{displayedError && displayedError}</Error>
					</form>
				</FormContainer>
			)}
			<SignUp>
				<span>New to Argent-Bank?</span> 
				<StyledLink to="/signup">Sign Up</StyledLink>
			</SignUp>
		</Container>
	)
}

const Container = styled.main`
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
	color: black;
	width: 300px;
	margin: 0 auto;
	margin-top: 3rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 5px;
	border: 2px #34495e solid;
	img {
		margin: 0 auto;
	}
`
const CheckboxContainer = styled.div`
	display: flex;
	margin-top: 1rem;
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
`
const Error = styled.p`
	color: red;
	font-size: 1rem;
	margin-top: 1rem;
`
const SignUp = styled.p`
	margin-top: 2rem;
	span {
		margin-right: .5rem;
	}
`
const StyledLink = styled(Link)`
	color: currentColor;
	text-decoration: inherit;
	&:hover {
		border-bottom: 2px currentColor solid;
	}
`