import PropTypes from 'prop-types'
import styled from 'styled-components'

const Img = styled.img<ImgTypes>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	margin: ${(props) => props.margin};
	border-radius: ${(props) => props.borderRadius};
	display: ${({ display }) => display ? display : "block"};
	filter: ${({ filter }) => filter};
	cursor: ${({ cursor }) => cursor};
	transition: ${({ transition }) => transition};
	object-fit: ${({ cover }) => (cover ? 'cover' : '')};
	overflow: ${({ overflow }) => overflow};
`
export default Img

Img.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	margin: PropTypes.string,
	borderRadius: PropTypes.string,
	display: PropTypes.string,
	filter: PropTypes.string,
	cursor: PropTypes.string,
	transition: PropTypes.string,
	cover: PropTypes.string,
	overflow: PropTypes.string,
}

type ImgTypes = {
	width?: string | number,
	height?: string | number,
	margin?: string,
	borderRadius?: string,
	display?: string,
	filter?: string,
	cursor?: string,
	transition?: string,
	cover?: string,
	overflow?: string,
}