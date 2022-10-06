import styled from 'styled-components'

export default function User() {
	// if user connected return name + logout 
	// else return login
  return (
	<Container>
      <UserInfos>
        <H1>Welcome back<br />Tony Jarvis!</H1>
        <EditButton>Edit Name</EditButton>
      </UserInfos>
      <h2 className="sr-only">Accounts</h2>
      <AccountSection>
        <AccountContent>
          <H3>Argent Bank Checking (x8349)</H3>
          <Amount>$2,082.79</Amount>
          <p>Available Balance</p>
        </AccountContent>
        <AccountCTA>
          <TransactionsButton>View transactions</TransactionsButton>
        </AccountCTA>
      </AccountSection>
      <AccountSection>
        <AccountContent>
          <H3>Argent Bank Savings (x6712)</H3>
          <Amount>$10,928.42</Amount>
          <p>Available Balance</p>
        </AccountContent>
        <AccountCTA>
          <TransactionsButton>View transactions</TransactionsButton>
        </AccountCTA>
      </AccountSection>
      <AccountSection>
        <AccountContent>
          <H3>Argent Bank Credit Card (x8349)</H3>
          <Amount>$184.30</Amount>
          <p>Current Balance</p>
        </AccountContent>
        <AccountCTA>
          <TransactionsButton>View transactions</TransactionsButton>
        </AccountCTA>
      </AccountSection>
    </Container>
  )
}

const Container = styled.main`
	background-color: #12002b;
    flex: 1;
`
const UserInfos = styled.div`
	color: #fff;
	margin-bottom: 2rem;
`
const H1 = styled.h1`
	margin: 1.5rem 0;
`
const EditButton = styled.button`
	border-color: #00bc77;
    background-color: #00bc77;
    color: #fff;
    font-weight: bold;
    padding: 10px;
	cursor: pointer;
`
const AccountSection = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid black;
	background-color: #fff;
	width: 80%;
	margin: 0 auto;
	padding: 1.5rem;
	box-sizing: border-box;
	text-align: left;
	margin-bottom: 2rem;
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
	width: 200px;
    padding: 8px;
    font-size: 1.1rem;
    margin-top: 1rem;
	cursor: pointer;
	@media screen and (max-width: 720px) {
		width: 100%;
	}
`
