import styled from "styled-components"
import Img from "./Img"
import PropTypes from 'prop-types'

/**
 * Component to create a card
 * @name Card
 * @component
 * @returns {JSX.Element} a card with an icon.
 */
export default function Card({imgSrc, imgLabel, title, text, width, height, margin}: Props): JSX.Element{
  return (
		<CardContainer $width={width} $height={height} $margin={margin}>
			<Img src={imgSrc} alt={imgLabel} />
			<H3>{title}</H3>
			<Content>{text}</Content>
		</CardContainer>		
  )
}

const CardContainer = styled.article<CardContainerTypes>`
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
interface Props {
	imgSrc?: string
	imgLabel?: string
	title?: string
	text?: string
	width?: string
	height?: string
	margin?: string
}

interface CardContainerTypes {
	$width?: string
	$height?: string
	$margin?: string
}