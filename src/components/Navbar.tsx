import { useTsSelector, useTsDispatch } from '../utils/redux/hooks'
import { getTokenFromState } from '../features/authentication/selectors'
import { toggleTheme } from '../features/theme/themeSlice'
import { FaUserCircle } from 'react-icons/fa'
import { MdLightMode } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Logo from '../assets/argentBankLogo.png'
import LoggedNavbar from './LoggedNavbar'
import styled from 'styled-components'
import Img from './Img'

/**
 * The navbar component
 * @name Navbar
 * @returns {JSX.Element} a navbar
 * @component
 */
export default function Navbar(): JSX.Element {

	// user token from redux store
	const userToken = useTsSelector(getTokenFromState)
	const dispatch = useTsDispatch()

	return (
		<Nav>
			<Link to="/">
				<Img src={Logo} width="200px" alt="logo argentBank" />
			</Link>
			<RightNavContainer>
				<ThemeBtn onClick={ () => dispatch(toggleTheme()) }>
					<Span>Theme</Span> <MdLightMode size='1.4rem' />
				</ThemeBtn>

				{/* if user connected return name + logout else return signin */
				userToken ?
					<LoggedNavbar />
				:
					<NavLink to="/signin">
						<FaUserCircle size='1.4rem' />
						<Span>Sign In</Span>
					</NavLink>
				}
			</RightNavContainer>
		</Nav>
	)
}

const Nav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 20px;
	border-bottom: 2px solid #ccc;
	@media (max-width: 700px) {
		flex-direction: column;
	}
	@media (max-width: 389px) {
		font-size: calc(15px + 2vw);
	}
`
const Span = styled.span`
	font-weight: bold;
	margin:	0 .7rem 0 .5rem;
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
const ThemeBtn = styled.button`
	background-color: transparent;
	display: flex;
	padding: 2px 5px;
    border-radius: 3px;
	border: none;
	cursor: pointer;
	font-size: large;
	color: inherit;
	span {
		margin-right: 10px;
	}
`

const RightNavContainer = styled.div`
	width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
	@media (max-width: 700px) {
		width: 100%;
	}
`
