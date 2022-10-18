import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../utils/redux/store'
import { toggleTheme } from '../features/theme/themeSlice'
import { useTsDispatch } from '../utils/redux/hooks'

export default function Footer() {
	
	const year = new Date().getFullYear()
	const theme = useSelector((state: RootState) => state.theme.theme)

	const dispatch = useTsDispatch()
	const toggle = () => dispatch(toggleTheme())

	return (
		<FooterContainer theme={theme}>
			<p>Copyright {year} <StyledLink to="/">Argent Bank</StyledLink></p>
			<NightModeBtn
				onClick={toggle}
			>
			<Icon theme={theme}>{theme === 'light' ? '🌙' : '☀️'}</Icon>
			</NightModeBtn>
		</FooterContainer>
	)
}

const FooterContainer = styled.footer<ThemeProps>`	
	padding: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
    margin: 0 auto;
	background: ${({ theme }) => (theme === 'dark' ? '#ecf0f1' : '#fff')};
`
const StyledLink = styled(Link)`
	color: inherit;
	text-decoration: none;
	margin-left: 5px;
	:hover {
		text-decoration: underline;
	}
`

const NightModeBtn = styled.button`
	background-color: transparent;
	font-size: 2rem;
	border: none;
`
const Icon = styled.span<ThemeProps>`
	margin-left: 1.5rem;
	cursor: pointer;
	&:hover {
		filter: ${({ theme }) => (theme === 'dark' ? 'drop-shadow(0px 0px 15px #fff)' : 'drop-shadow(0px 0px 15px black)')};
	}
`
interface ThemeProps {
	theme : boolean
}
