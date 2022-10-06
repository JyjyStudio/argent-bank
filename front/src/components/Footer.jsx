import styled from 'styled-components'
import StyledLink from './StyledLink'

export default function Footer() {
	
	const year = new Date().getFullYear()

	return (
		<FooterContainer>
			
			
			<div>Copyright {year} <StyledLink to="/">Argent Bank</StyledLink></div>
		</FooterContainer>
	)
}

const FooterContainer = styled.footer`
	display: flex;
	justify-content: center;
	border-top: 2px solid #ccc;
	padding: 2rem 0 1.5rem;
`
