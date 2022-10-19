import { Link } from "react-router-dom"
import styled from "styled-components"


/**
 * 404 page
 * @name 404
 * @component
 * @returns {JSX.Element} the 404 page.
 */
export default function NotFound(): JSX.Element {
	return (
		<OopsContainer>
			<Oops fontSize="12rem" fontWeight="700" mobileFontSize="8rem">404</Oops>
			<Oops fontSize="2rem" fontWeight="500" mobileFontSize="1.5rem">Oups! La page que vous demandez n'existe pas.</Oops>
			<StyledLink to="/">Retourner sur la page d’accueil</StyledLink>
		</OopsContainer>
	)
}

const OopsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 3rem;
	gap: 1rem;
	flex: 1 1 0%;
`
const Oops = styled.div<Props>`
	color: #00BC78;
	font-size: ${({fontSize}) => fontSize};
	font-weight: ${({fontWeight}) => fontWeight};
	@media (max-width: 768px) {
		font-size: ${({mobileFontSize}) => mobileFontSize};
	}
`
const StyledLink = styled(Link)`
	color: #00BC78;
	margin: 7rem 0;
`
interface Props {
	fontSize: string
	fontWeight: string
	mobileFontSize: string
}
