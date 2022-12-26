import styled from 'styled-components'
import Features from '../components/Features'
import Hero from "../components/Hero"

/**
 * The Home page
 * @name Home
 * @returns {JSX.Element} the home page.
 * @component
 */
export default function Home(): JSX.Element {
	return (
		<HomeContainer>
			<Hero />
			<Features />
		</HomeContainer>
	)
}

const HomeContainer = styled.main`
`
