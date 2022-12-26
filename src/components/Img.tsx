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