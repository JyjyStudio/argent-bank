import styled from 'styled-components'

export default function Loader() {
	return (
	<SpinnerContainer>
		<Spinner />
	</SpinnerContainer>
	)
}

const SpinnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	position: fixed;
	width: 100%;
	min-height: 100%;
	transform: translateY(3rem)
`
const Spinner = styled.div`
	position: absolute;
	height: 3rem;
	width: 3rem;
	border-radius: 50%;
	animation: rotate-spinner 600ms ease-in-out infinite;
`
