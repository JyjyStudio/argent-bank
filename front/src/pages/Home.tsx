import styled from 'styled-components'
import Features from '../components/Features'
import Hero from "../components/Hero"

export default function Home() {
	return (
		<HomeContainer>
			<Hero />
			<Features />
		</HomeContainer>
	)
}

const HomeContainer = styled.main`
`
