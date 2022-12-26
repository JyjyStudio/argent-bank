import styled from 'styled-components'
import { Link } from 'react-router-dom'

/**
 * Footer component
 * @name Profile
 * @component
 * @returns {JSX.Element} the Footer component
 */
export default function Footer():JSX.Element {
	
	const year = new Date().getFullYear()

	return (
		<FooterContainer>
			<p>Copyright {year} <StyledLink to="/">Argent Bank</StyledLink></p>
		</FooterContainer>
	)
}

const FooterContainer = styled.footer`	
	padding: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
    margin: 0 auto;
	border-top: 2px solid #ccc;
`
const StyledLink = styled(Link)`
	color: inherit;
	text-decoration: none;
	margin-left: 5px;
	:hover {
		text-decoration: underline;
	}
`
