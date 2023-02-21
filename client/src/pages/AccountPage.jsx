import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { userContext } from "../userContext"

export default function AccountPage() {
	const { ready, user, setUser } = useContext(userContext)
	const [redirect, setRedirect] = useState(null)
	let { subpage } = useParams()
	if (subpage === undefined) {
		subpage = 'profile'
	}

	async function logout() {
		await axios.post('/logout')
		setRedirect('/')
		setUser(null)
	}

	if (!ready) {
		return "loading..."
	}

	if (!user && ready && !redirect) {
		return <Navigate to="/login" />
	}

	function linkClasses(type = null) {
		let classes = 'py-2 px-6'
		if (type === subpage) {
			classes += ' bg-primary rounded-full text-white'
		}
		return classes
	}

	if (redirect){
		return <Navigate to={redirect} />
	}

	return (
		<div>
			<nav className="w-full flex justify-center mt-8 gap-4 mb-8">
				<Link className={linkClasses('profile')} to={'/account'}>Account</Link>
				<Link className={linkClasses('bookings')} to={'/account/bookings'}>Booking</Link>
				<Link className={linkClasses('places')} to={'/account/places'}>My accomodations</Link>
			</nav>
			{subpage === 'profile' && (
				<div className="text-center max-w-lg mx-auto">
					Logged in as {user.name} ({user.email}))
					<button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
				</div>
			)}
		</div>
	)
}
