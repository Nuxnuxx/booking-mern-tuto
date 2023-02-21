import './App.css'
import { Routes, Route } from 'react-router-dom'
import IndexPages from './pages/IndexPages'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from "axios";
import UserContextProvider from './userContext'
import AccountPage from './pages/AccountPage'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

function App() {
	return (
		<UserContextProvider>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<IndexPages />}></Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/register" element={<RegisterPage />}></Route>
				<Route path="/account/:subpage?" element={<AccountPage />}></Route>
			</Route>
		</Routes>
		</UserContextProvider>
	)
}

export default App
