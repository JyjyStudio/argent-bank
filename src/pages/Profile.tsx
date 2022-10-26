import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenFromState, getStatus } from '../features/authentication/selectors'
import { getUserInfosFromState, getUserInfosStatus } from '../features/user/selectors'
import { getUserInfos, editUser } from '../features/user/userSlice'
import { useTsSelector, useTsDispatch } from '../utils/redux/hooks'
import { getTheme } from '../features/theme/selector'
import styled from 'styled-components'
import Loader from '../components/Loader'

/**
 * user's profile page
 * @name Profile
 * @component
 * @returns {JSX.Element} the profile page.
 */
export default function Profile(): JSX.Element {
	// token from redux store
	const userToken = useTsSelector(getTokenFromState)
	const userInfos = useTsSelector(getUserInfosFromState)
	const authStatus = useTsSelector(getStatus)
	const userStatus = useTsSelector(getUserInfosStatus)
	const dispatch = useTsDispatch()
	const navigate = useNavigate()

	//input refs
	const firstnameInput = useRef<HTMLInputElement>(null)
	const lastnameInput = useRef<HTMLInputElement>(null)

	// editing state
	const [isEditing, setIsEditing] = useState(false)
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')

	// if userToken does not exists => go to login page, else render the profile page
	useEffect(() => {
		// fist time on the profile page and after authentication is done
		if (authStatus === 'resolved' && userStatus === 'void') {
			dispatch(getUserInfos(userToken))
		}

		// navigate to login page if user doesn't have a token
		!userToken && navigate('/login')

		// set the focus on the input on editing
		firstnameInput.current?.focus()
	}, [userToken, authStatus, userStatus, navigate, dispatch, isEditing])

	const user = {
		token: userToken,
		body: {
			firstName: firstname,
			lastName: lastname,
		},
	}

	const saveName = () => {
		// visual feedback: if no firstname or lastname, add class error (red shadow on input)
		!firstnameInput.current?.value.trim() &&
			firstnameInput.current?.classList.add('error')
		!lastnameInput.current?.value.trim() &&
			lastnameInput.current?.classList.add('error')

		// validation: we want to have a firstname and a lastname before sending data
		if (firstname.trim() && lastname.trim()) {
			dispatch(editUser(user))
			setIsEditing(false)
		}
	}
	const resetError = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.classList.remove('error')
	}

	const theme = useTsSelector(getTheme)

	return (
		<Container theme={theme}>
			{(userStatus === 'void' || userStatus === 'pending') ? (
				<Loader bottom="50%" />
			) : (
				<>
					<UserInfos theme={theme}>
						{isEditing ? (
							<>
								<H1>Welcome back</H1>
								<EditContainer>
									<div>
										<StyledInput
											ref={firstnameInput}
											type="text"
											value={firstname}
											placeholder={userInfos.firstname?.toString()}
											onFocus={resetError}
											onChange={(e) => {
												setFirstname(e.target.value)
											}}
										/>
										<StyledInput
											ref={lastnameInput}
											type="text"
											value={lastname}
											placeholder={userInfos.lastname?.toString()}
											onFocus={resetError}
											onChange={(e) => {
												setLastname(e.target.value)
											}}
										/>
									</div>
									<EditButtonsContainer>
										<EditButton
											padding="10px 2rem"
											onClick={saveName}
										>
											Save
										</EditButton>
										<EditButton
											padding="10px 2rem"
											onClick={() => setIsEditing(false)}
										>
											Cancel
										</EditButton>
									</EditButtonsContainer>
								</EditContainer>
							</>
						) : (
							<>
								<H1>
									Welcome back
									<br />
									{userInfos.firstname} {userInfos.lastname} !
								</H1>
								<EditButton
									padding="10px 1rem"
									onClick={() => setIsEditing(true)}
								>
									Edit Name
								</EditButton>
							</>
						)}
					</UserInfos>
					<h2 className="sr-only">Accounts</h2>
					<AccountSection>
						<AccountContent>
							<H3>Argent Bank Checking (x8349)</H3>
							<Amount>$2,082.79</Amount>
							<p>Available Balance</p>
						</AccountContent>
						<AccountCTA>
							<TransactionsButton>
								View transactions
							</TransactionsButton>
						</AccountCTA>
					</AccountSection>
					<AccountSection>
						<AccountContent>
							<H3>Argent Bank Savings (x6712)</H3>
							<Amount>$10,928.42</Amount>
							<p>Available Balance</p>
						</AccountContent>
						<AccountCTA>
							<TransactionsButton>
								View transactions
							</TransactionsButton>
						</AccountCTA>
					</AccountSection>
					<AccountSection>
						<AccountContent>
							<H3>Argent Bank Credit Card (x8349)</H3>
							<Amount>$184.30</Amount>
							<p>Current Balance</p>
						</AccountContent>
						<AccountCTA>
							<TransactionsButton>
								View transactions
							</TransactionsButton>
						</AccountCTA>
					</AccountSection>
				</>
			)}
		</Container>
	)
}

const Container = styled.main`
	flex: 1;
`
const UserInfos = styled.div`
	color: ${({ theme }) => (theme === 'dark' ? '#ecf0f1' : '#12002b')};
	margin-bottom: 2rem;
`
const H1 = styled.h1`
	margin: 1.5rem 0;
	line-height: 3rem;
`
const EditButton = styled.button<Props>`
	font-size: 1rem;
	border-radius: 5px;
	background-color: #00bc77;
	border-color: #00bc77;
	color: #fff;
	font-weight: bold;
	padding: ${({ padding }) => padding};
	cursor: pointer;
	margin: 1rem;
`
const AccountSection = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid black;
	background-color: #fff;
	color: black;
	width: 80%;
	margin: 0 auto;
	padding: 1.5rem;
	box-sizing: border-box;
	text-align: left;
	margin-bottom: 2rem;
	border-radius: 5px;
	@media screen and (max-width: 720px) {
		flex-direction: column;
	}
`
const AccountContent = styled.div`
	width: 100%;
	flex: 1;
`
const H3 = styled.h3`
	font-size: 1rem;
	font-weight: normal;
`
const Amount = styled.p`
	font-size: 2.5rem;
	font-weight: bold;
`
const AccountCTA = styled.div`
	width: 100%;
	flex: 0;
`
const TransactionsButton = styled(EditButton)`
	display: block;
	width: 250px;
	padding: 8px;
	font-size: 1.1rem;
	margin-top: 1rem;
	cursor: pointer;
	border-color: #00bc77;
	@media screen and (max-width: 720px) {
		width: 100%;
		margin: 1rem 0 0;
	}
`
const EditContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`
const StyledInput = styled.input<Props>`
	border-radius: 5px;
	padding: 10px 1.5rem;
	margin: 1.5rem 1rem;
	border: none;
	outline: none;
	font-size: 1rem;
	&.error {
		box-shadow: 0px 4px 0px #ff4d4d;
		animation: error 250ms ease-in-out;
		@keyframes error {
			0% {
				transform: translateX(0px);
			}
			33% {
				transform: translateX(10px);
			}
			66% {
				transform: translateX(-10px);
			}
			100% {
				transform: translateX(0px);
			}
		}
	}
`
const EditButtonsContainer = styled.div`
	display: flex;
	justify-content: center;
`
interface Props {
	padding?: string
	theme?: boolean
	ref?: React.RefObject<HTMLElement>
	className?: string
}
