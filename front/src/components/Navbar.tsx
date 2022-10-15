import styled from 'styled-components'
import StyledLink from './StyledLink'
import Img from './Img'
import Logo from '../assets/argentBankLogo.png'
import SignInIcon from '../assets/icon-login.png'
import SignOutIcon from '../assets/icon-logout.png'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetAuth } from '../features/authentication/authenticationSlice'
import { asyncGetInfos, resetUser } from '../features/user/userSlice'
import { getTokenFromState } from '../features/authentication/selectors'
import { getUserInfosFromState } from '../features/user/selectors'

/**
 * The top and left navbar
 * @name Navbar
 * @returns {ReactElement} the navbar
 * @component
 */
export default function Navbar() {
	// user token from redux store
	const userToken = useSelector(getTokenFromState)
	const userInfos = useSelector(getUserInfosFromState)

	const dispatch = useDispatch()

	useEffect(() => {
		userToken && dispatch(asyncGetInfos(userToken))
	}, [dispatch, userToken])


	const resetCredentials = () => {
		dispatch(resetAuth())
		dispatch(resetUser())
	}

	return (
		<Nav>
			<StyledLink to="/">
				<Img src={Logo} width="200px" alt="logo argentBank" />
			</StyledLink>
			{
				/* if user connected return name + logout else return login */
				userToken ? (
					<SignOutContainer>
						<NavLink to="/profile">
							<Img
								src={SignInIcon}
								width="25px"
								margin="0 5px 0 0"
								alt="sign in"
							/>
							<Span>{userInfos.firstname}</Span>
						</NavLink>
						<NavLink onClick={resetCredentials}>
							<Img
								src={SignOutIcon}
								width="20px"
								margin="0 5px 0 0"
								alt="sign in"
							/>
							<Span>Sign Out</Span>
						</NavLink>
					</SignOutContainer>
				) : (
					<NavLink to="/login">
						<Img
							src={SignInIcon}
							width="25px"
							margin="0 5px 0 0"
							alt="sign in"
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
const NavLink = styled(StyledLink)`
	display: flex;
	align-items: center;
`
