import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function Footer() {
	
	const year = new Date().getFullYear()

	return (
		<FooterContainer>
			<p>Copyright {year} <StyledLink to="/">Argent Bank</StyledLink></p>
		</FooterContainer>
	)
}

const FooterContainer = styled.footer`	
	border-top: 2px solid #ccc;
	padding: 2rem 0 1.5rem;
`
const StyledLink = styled(Link)`
	color: inherit;
	text-decoration: none;
	margin-left: 5px;
	:hover {
		text-decoration: underline;
	}
`
