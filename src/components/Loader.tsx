import styled from 'styled-components'
import PropTypes,  { InferProps } from 'prop-types'

/**
 * Loader component
 * @name Loader
 * @component
 * @returns {JSX.Element} a loader.
 */
export default function Loader({bottom}:LoaderPropTypes): JSX.Element {
	return (
		<SpinnerContainer>
			<Spinner bottom={bottom}/>
		</SpinnerContainer>
	)
}

const SpinnerContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
`
const Spinner = styled.div<LoaderPropTypes>`
	position: absolute;
	bottom: ${({bottom}) => bottom};
	left: 46%;
	width: 64px;
	height: 64px;
	border: 8px solid #fff;
	border-radius: 50%;
	border-color: #fff transparent transparent transparent;
	animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	animation-delay: -0.45s;

	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`
Loader.propTypes = {
	bottom: PropTypes.string.isRequired,
}
type LoaderPropTypes = InferProps<typeof Loader.propTypes>