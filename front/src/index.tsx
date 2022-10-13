import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import GlobalStyle from './utils/styles/GlobalStyle'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import { Provider } from 'react-redux'
// @ts-ignore
import { store } from './utils/redux/store.ts'

// testing if we have a root element before invoking ReactDOM.createRoot (typescript)
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)
root.render(
	<Provider store={store}>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<GlobalStyle />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</Provider>
)