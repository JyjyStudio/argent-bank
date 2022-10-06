import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { ViewportProvider } from './utils/Context/ViewportContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import GlobalStyle from './utils/styles/GlobalStyle'
import Footer from './components/Footer'
import User from './pages/User'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<ViewportProvider>
				<GlobalStyle />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<User />} />
				</Routes>
				<Footer />
			</ViewportProvider>
		</BrowserRouter>
	</React.StrictMode>
)
