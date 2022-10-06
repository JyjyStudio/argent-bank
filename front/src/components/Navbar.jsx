import styled from 'styled-components'
import StyledLink from './StyledLink'
import Img from './Img'
import Logo from '../assets/argentBankLogo.png'
import SignInIcon from '../assets/icon-login.png'

/**
 * The top and left navbar
 * @name Navbar
 * @returns {ReactElement} the navbar
 * @component
 */
export default function Navbar() {
	return (
		<Nav padding="5px 20px">
			<StyledLink to="/">
				<Img src={Logo} width="200px" alt="logo" />
			</StyledLink>
			{/* if user connected return name + logout else return login */}
			<StyledLink to="/login">
				<SignInContainer>
					<Img src={SignInIcon} width="25px" margin="0 5px 0 0" alt="sign in" />
					<Span>Sign In</Span>
				</SignInContainer>
			</StyledLink>
		</Nav>
	)
}

const Nav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding:  ${({ padding }) => padding};
	@media (max-width: 389px) {
		font-size: calc(15px + 2vw);
	}
`
const SignInContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-right: 0.5rem;
`
const Span = styled.span`
	font-weight: bold;
	color: #2c3e50;
`