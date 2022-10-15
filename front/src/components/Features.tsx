import styled from 'styled-components'
import ChatIcon from '../assets/icon-chat.png'
import MoneyIcon from '../assets/icon-money.png'
import SecurityIcon from '../assets/icon-security.png'
import Card from './Card'

export default function Features() {
	const ChatText = "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
	const MoneyText = "The more you save with us, the higher your interest rate will be!"
	const securityText = "We use top of the line encryption to make sure your data and money is always safe."
	return (
		<Container>
			<h2 className="sr-only">Features</h2>
			<Card imgSrc={ChatIcon} imgLabel="Chat Icon" title="You are our #1 priority" text={ChatText} />
			<Card imgSrc={MoneyIcon} imgLabel="Money Icon" title="More savings means higher rates" text={MoneyText} />
			<Card imgSrc={SecurityIcon} imgLabel="Security Icon" title="Security you can trust" text={securityText} />
		</Container>
	)
}

const Container = styled.section`
	display: flex;
	img {
		width: 100px;
		border: 10px solid #00bc77;
		border-radius: 50%;
		padding: 1rem;
		box-sizing: content-box;
	}
	@media screen and (max-width: 920px) {
		flex-direction: column;
	}
`
