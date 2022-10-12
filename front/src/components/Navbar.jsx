import styled from 'styled-components'
import StyledLink from './StyledLink'
import Img from './Img'
import Logo from '../assets/argentBankLogo.png'
import SignInIcon from '../assets/icon-login.png'
import SignOutIcon from '../assets/icon-logout.png'
import { useDispatch } from 'react-redux'
import { logOut } from '../features/auth/authSlice'

/**
 * The top and left navbar
 * @name Navbar
 * @returns {ReactElement} the navbar
 * @component
 */
export default function Navbar() {

	// user token from redux store
	const userToken = localStorage.getItem('userToken')

	// redirect user to profile page if login was successful
	const dispatch = useDispatch()
	const loggOut = () => {
		localStorage.removeItem('userToken')
		dispatch(logOut())
	}

	return (
		<Nav>
			<StyledLink to="/">
				<Img src={Logo} width="200px" alt="logo argentBank" />
			</StyledLink>
			{/* if user connected return name + logout else return login */
			userToken ?
				<SignOutContainer>
					<NavLink to="/profile">
						<Img src={SignInIcon} width="25px" margin="0 5px 0 0" alt="sign in" />
						<Span>Prenom</Span>
					</NavLink>
					<NavLink onClick={() => loggOut()}>
						<Img src={SignOutIcon} width="20px" margin="0 5px 0 0" alt="sign in" />
						<Span>Sign Out</Span>
					</NavLink>
				</SignOutContainer>
				:
				<NavLink to="/login">
					<Img src={SignInIcon} width="25px" margin="0 5px 0 0" alt="sign in" />
					<Span>Sign In</Span>
				</NavLink>
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
