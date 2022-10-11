import { createGlobalStyle } from 'styled-components'

export default function GlobalStyle() {
	return <StyledGlobalStyle />
}

const StyledGlobalStyle = createGlobalStyle`
    *, ::before, ::after {
        margin: 0;
		padding: 0;
		box-sizing: border-box;
    }

	body, html, #root {
		height: 100%;
	}

	#root {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	body {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
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
	@keyframes fade {
		0% {
			background: rgba(#000000, .6);
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			
		}
	}
	@keyframes scale {
		0% {
			transform: scale(1);
		}
		90% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
`
