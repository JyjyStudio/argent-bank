import styled from 'styled-components'
import { Link } from "react-router-dom"
import Img from './Img'
import Logo from '../assets/argentBankLogo.png'
import SignInIcon from '../assets/icon-login.png'
import SignOutIcon from '../assets/icon-logout.png'
import { useEffect } from 'react'
import { resetAuth } from '../features/authentication/authenticationSlice'
import { asyncGetInfos, resetUser } from '../features/user/userSlice'
import { getTokenFromState } from '../features/authentication/selectors'
import { getUserInfosFromState } from '../features/user/selectors'
import { useTsSelector, useTsDispatch } from '../utils/redux/hooks'

/**
 * The navbar component
 * @name Navbar
 * @returns {JSX.Element} a navbar
 * @component
 */
export default function Navbar(): JSX.Element {
	// user token from redux store
	const userToken = useTsSelector(getTokenFromState)
	const userInfos = useTsSelector(getUserInfosFromState)

	const dispatch = useTsDispatch()

	useEffect(() => {
		(!userInfos.firstname && userToken) && dispatch(asyncGetInfos(userToken))
	}, [dispatch, userToken, userInfos.firstname])


	const resetCredentials = () => {
		dispatch(resetAuth())
		dispatch(resetUser())
	}

	return (
		<Nav>
			<Link to="/">
				<Img src={Logo} width="200px" alt="logo argentBank" />
			</Link>
			{
				/* if user connected return name + logout else return login */
				userToken ? (
					<SignOutContainer>
						<NavLink to="/profile">
							<Img
								src={SignInIcon}
								width="25px"
								margin="0 5px 0 0"
								alt="profile icon"
							/>
							<Span>{userInfos.firstname}</Span>
						</NavLink>
						<Button onClick={resetCredentials}>
							<Img
								src={SignOutIcon}
								width="20px"
								margin="0 5px 0 0"
								alt="sign out icon"
							/>
							<Span>Sign Out</Span>
						</Button>
					</SignOutContainer>
				) : (
					<NavLink to="/login">
						<Img
							src={SignInIcon}
							width="25px"
							margin="0 5px 0 0"
							alt="sign in icon"
						/>
						<Span>Sign In</Span>
					</NavLink>
				)
			}
		</Nav>
	)
}

const Nav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 20px;
	@media (max-width: 389px) {
		font-size: calc(15px + 2vw);
	}
`
const SignOutContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const Span = styled.span`
	font-weight: bold;
	color: #2c3e50;
	margin-right: 1rem;
`
const NavLink = styled(Link)`
	display: flex;
	align-items: center;
	color: inherit;
	text-decoration: none;
	margin-left: 5px;
	:hover {
		text-decoration: underline;
	}
`
const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
    color: #2c3e50;
	background-color: transparent;
	font-weight: bold;
	font-size: 1rem;
	cursor: pointer;
	border: none;
	:hover {
		text-decoration: underline
	}
`
