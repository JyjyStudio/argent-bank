import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
	theme: string
}

//creation d'une partie de notre store (slice). Contient le nom du slice, son state initial et les reducers
const initialState: InitialState = {
	theme: 'light'
}
export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme =  state.theme === "dark" ? "light" : "dark"
		},
	},
})

// actions creator
export const { toggleTheme } = themeSlice.actions
