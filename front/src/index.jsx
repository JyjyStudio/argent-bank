import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import GlobalStyle from './utils/styles/GlobalStyle'
import Footer from './components/Footer'
import User from './pages/User'
import { Provider } from 'react-redux'
import { store } from './utils/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<GlobalStyle />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<User />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</Provider>
)

