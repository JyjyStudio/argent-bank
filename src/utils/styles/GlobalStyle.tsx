import { createGlobalStyle } from 'styled-components'
import { getTheme } from '../../features/theme/selector'
import { useTsSelector } from '../redux/hooks'

export default function GlobalStyle() {
	const theme = useTsSelector(getTheme)

	return <StyledGlobalStyle theme={theme}/>
}

const StyledGlobalStyle = createGlobalStyle`
    *, ::before, ::after {
        margin: 0;
		padding: 0;
		box-sizing: border-box;
    }

	body, html, #root {
		min-height: 100vh;
		color: ${({ theme }) => (theme === 'dark' ? '#ecf0f1' : '#12002b')};
		background: ${({ theme }) => (
			theme === 'dark' 
			? ' linear-gradient(178.6deg, rgb(20, 36, 50) 11.8%, rgb(124, 143, 161) 83.8%) ' 
			: ' linear-gradient(178.6deg, rgb(232, 245, 253) 3.3%, rgb(252, 253, 255) 109.6%) '
		)};
	}

	#root {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	body {
		font-family: 'Fira sans', sans-serif;
		webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	html {
		scroll-behavior: smooth;
	}

	.sr-only{
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
		border: 0 !important;
		clip: rect(1px, 1px, 1px, 1px) !important;
		-webkit-clip-path: inset(50%) !important;
		clip-path: inset(50%) !important;
		height: 1px !important;
		margin: -1px !important;
		overflow: hidden !important;
		padding: 0 !important;
		position: absolute !important;
		width: 1px !important;
		white-space: nowrap !important;
	}
	// Animation du spinner 
	@keyframes rotate-spinner {
		0% {
			transform: rotate(0deg);
			box-shadow : 1px 3px 2px lightgreen;
		}
		50% {
			transform: rotate(180deg);
			box-shadow : 1px 3px 2px green;
		}
		100% {
			transform: rotate(360deg);
			box-shadow : 1px 3px 2px lightblue;
		}
	}
`
