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
	top: 2rem;
	width: 100%;
	min-height: 100%;
	animation: scale 3000ms ease-in-out;
	transform: scale(0);
`

const Spinner = styled.div`
	position: absolute;
	height: 5rem;
	width: 5rem;
	border-radius: 50%;
	animation: rotate-spinner 600ms ease-in-out infinite;
`
