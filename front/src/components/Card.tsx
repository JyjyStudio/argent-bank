import styled from "styled-components"
import Img from "./Img"
import PropTypes from 'prop-types'

/**
 * Component to create a card
 * @name Card
 * @param {string} imgSrc - path of the icon.
 * @param {string} imgLabel - label of the icon.
 * @param {string} title - title of the card.
 * @param {string} text - text of the card.
 * @param {string} width - width of the icon.
 * @param {string} height - height of the icon.
 * @param {string} margin - margin of the icon.
 * @returns {ReactElement} a card with an icon.
 * @component
 */
export default function Card({imgSrc, imgLabel, title, text, width, height, margin}) {
  return (
	<>
		<StyledCard $width={width} $height={height} $margin={margin}>
			<Img src={imgSrc} alt={imgLabel} />
			<H3>{title}</H3>
			<Content>{text}</Content>
		</StyledCard>		
	</>
  )
}

const StyledCard = styled.article`
	width: ${({$width}) => $width};
	height: ${({$height}) => $height};
	margin: ${({$margin}) => $margin};
	flex: 1;
	padding: 2.5rem;
	img {
		margin: 0 auto;
	}
`
const H3 = styled.h3`
	color: #222;
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