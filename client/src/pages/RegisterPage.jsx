import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function registeruser(ev){
		ev.preventDefault();
		await axios.post('/register', {
			name,
			email,
			password
		})
		alert('User registered successfully');
	};

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto" onSubmit={registeruser}>
					<input type="text"
						placeholder="John doe"
						value={name}
						onChange={ev => setName(ev.target.value)} />
					<input type="email"
						placeholder={'your@email.com'}
						value={email}
						onChange={ev => setEmail(ev.target.value)} />
					<input type="password"
						placeholder="password"
						value={password}
						onChange={ev => setPassword(ev.target.value)} />
					<button className="primary">Register</button>
				</form>
				<div className="text-center py-2 text-gray-500">
					Already have an account?
					<Link className="underline text-black" to={'/login'}>Login</Link>
				</div>
			</div>
		</div>
	)
}
