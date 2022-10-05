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
`
