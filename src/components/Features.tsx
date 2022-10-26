import styled from 'styled-components'
import Card from './Card'
import { IoShieldCheckmarkSharp } from 'react-icons/io5'
import { GiTakeMyMoney } from 'react-icons/gi'
import { BiSupport } from 'react-icons/bi'

/**
 * The Feature Homepage component
 * @name Features
 * @returns {JSX.Element} the homepage features section
 * @component
 */
export default function Features(): JSX.Element {
	const ChatText = "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
	const MoneyText = "The more you save with us, the higher your interest rate will be!"
	const securityText = "We use top of the line encryption to make sure your data and money is always safe."
	return (
		<Container>
			<h2 className="sr-only">Features</h2>
			<Card Icon={BiSupport} title="You are our #1 priority" text={ChatText} />
			<Card Icon={GiTakeMyMoney} title="More savings means higher rates" text={MoneyText} />
			<Card Icon={IoShieldCheckmarkSharp} title="Security you can trust" text={securityText} />
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
