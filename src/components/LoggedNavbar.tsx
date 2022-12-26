import { resetAuth } from '../features/authentication/authenticationSlice'
import { resetUser } from '../features/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { getUserInfosFromState } from '../features/user/selectors'
import { useTsDispatch, useTsSelector } from '../utils/redux/hooks'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';


export default function LoggedNavbar() {

	const navigate = useNavigate()
	const dispatch = useTsDispatch()

	const userInfos = useTsSelector(getUserInfosFromState)


	const resetCredentials = () => {
		dispatch(resetAuth())
		dispatch(resetUser())
		navigate('/')
	}
	return (
		<SignOutContainer>
			<NavLink to="/profile">
				<FaUserCircle size='1.4rem' />
				<Span>{userInfos.firstname}</Span>
			</NavLink>
			<SignoutBtn onClick={resetCredentials}>
				<RiLogoutCircleRLine size='1.4rem' />
				<Span>Sign Out</Span>
			</SignoutBtn>
		</SignOutContainer>
  )
}

const SignOutContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const NavLink = styled(Link)`
	display: flex;
	align-items: center;
	color: inherit;
	text-decoration: none;
	margin-left: 5px;
	:hover {
		text-decoration: underline;
	}
`
const SignoutBtn = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	color: inherit;
	background-color: transparent;
	font-weight: bold;
	font-size: 1rem;
	cursor: pointer;
	border: none;
	:hover {
		text-decoration: underline;
	}
`
const Span = styled.span`
	font-weight: bold;
	margin: 0 .7rem 0 .5rem;
`