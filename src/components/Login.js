// import React, { useState } from 'react';
import { useState } from 'react';
import { loginUserAPIMethod } from '../api/client';
import Register from './Register';

function Login({ setProfile, setIsLogin }) {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const loginErrorMsg = document.getElementById('login-error-msg');
	const [show, setShow] = useState(false);

	const onChangeEmail = (event) => {
		// loginErrorMsg.style.display = 'none';
		document.getElementById('login-error-msg').style.display = 'none';
		let loginEmail = event.target.value;
		console.log(
			'🚀 ~ file: Login.js ~ line 16 ~ onChangeEmail ~ loginEmail',
			loginEmail
		);
		setLoginEmail(loginEmail);
	};

	const onChangePassword = (event) => {
		// loginErrorMsg.style.display = 'none';
		document.getElementById('login-error-msg').style.display = 'none';
		let loginPassword = event.target.value;
		setLoginPassword(loginPassword);
	};

	const login = async () => {
		setProfile(true);
		setIsLogin(false);
		try {
			const user = await loginUserAPIMethod({
				email: loginEmail,
				password: loginPassword,
			});
			console.log('user: ', user);
			setProfile(user);
		} catch (e) {
			console.log(e);
			document.getElementById('login-error-msg').style.display = 'block';
		}
	};

	return (
		// NOTE delete div#start-page and RegisterPage component to restore
		<div id="start-page">
			<div id="wrapper-login">
				<div id="login-title">
					<h1>Notes</h1>
					<h2>Organize all your thoughts in one place</h2>
				</div>
				<div id="login-overlay">
					<div id="login-input">
						<label>Email</label>
						<input
							id="login-input-email"
							type="text"
							onChange={onChangeEmail}
						/>
						<label>Password</label>
						<input
							id="login-input-password"
							type="password"
							onChange={onChangePassword}
						/>
					</div>
					<div id="login-error-msg">Error: Invalid email and/or password</div>
					<div id="login-btn">
						<button
							id="btn-login"
							onClick={login}
							// onClick={setProfile(true)}
						>
							Log In
						</button>
						<hr />
						<button id="btn-create" onClick={() => setShow(true)}>
							Create New Account
						</button>
					</div>
				</div>
			</div>
			<Register show={show} onClose={() => setShow(false)} />
		</div>
	);
}

export default Login;