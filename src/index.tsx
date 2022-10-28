import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './utils/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import GlobalStyle from './utils/styles/GlobalStyle'
import NotFount from './pages/404'

// to hide the state in production
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter basename={process.env.PUBLIC_URL}>
					<GlobalStyle />
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<NotFount />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</>
)