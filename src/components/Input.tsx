import { SetStateAction } from 'react'
import styled from 'styled-components'

/**
 * Used to standardize the style and usage of inputs in all our forms.
 */
export default function Input({ type, name, value, setFunction, autoComplete, required }: Props) {

	const formatName = (name : string) => name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1) + ' ')

	return (
		<Container>
			<Label htmlFor={name}>{formatName(name)}</Label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={(event) => setFunction(event.target.value)}
				required={required ? true : false}
				autoComplete={autoComplete}
			/>
		</Container>
	)
}
interface Props {
	type: string
	name: string
	value: string
	setFunction: React.Dispatch<SetStateAction<string>>
	required?: boolean
	autoComplete?: string
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`
const Label = styled.label`
	margin: .7rem 0 .3rem;
	text-align: left;
`
