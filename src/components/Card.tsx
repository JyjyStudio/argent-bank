import styled from "styled-components"
import PropTypes from 'prop-types'

/**
 * Component to create a card
 * @name Card
 * @component
 * @returns {JSX.Element} a card with an icon.
 */
export default function Card({Icon, title, text}: Props): JSX.Element{
  return (
		<CardContainer>
			<Icon size="4rem" />
			<H3>{title}</H3>
			<Content>{text}</Content>
		</CardContainer>		
  )
}

const CardContainer = styled.article`
	flex: 1;
	padding: 2.5rem;
	img {
		margin: 0 auto;
	}
`
const H3 = styled.h3`
	font-size: 1.25rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
	margin-top: 1rem;
`
const Content = styled.p`
	margin: 1rem 0;
	font-size: 1.2em;
`

Card.propTypes = {
	imgSrc : PropTypes.string,
	imgLabel : PropTypes.string,
	title : PropTypes.string,
	text : PropTypes.string,
	width : PropTypes.string,
	height : PropTypes.string,
	margin : PropTypes.string,
}
interface Props {
	Icon?: any
	imgLabel?: string
	title?: string
	text?: string
	width?: string
	height?: string
	margin?: string
}
