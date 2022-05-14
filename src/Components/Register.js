// import React, { useState } from 'react';
import { useState } from 'react';
// import { registerUserAPIMethod } from '../api/client';

function Register({ setUser, setIsLogin, show, onClose }) {
	const [registerName, setRegisterName] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const registerErrorMsg = document.getElementById('register-error-msg');

	// NOTE 1 character before an @ symbol, followed by domain name
	// NOTE minimum 8 characters in length

	// const closeRegister = () => {
	// 	setIsLogin(true);
	// };

	const onChangeName = (event) => {
		// registerErrorMsg.style.display = 'none';
		console.log(event.target.value);
		let registerName = event.target.value;
		setRegisterName(registerName);
	};

	const onChangeEmail = (event) => {
		// registerErrorMsg.style.display = 'none';
		console.log(event.target.value);
		let registerEmail = event.target.value;
		setRegisterEmail(registerEmail);
	};

	const onChangePassword = (event) => {
		// registerErrorMsg.style.display = 'none';
		console.log(event.target.value);
		let registerPassword = event.target.value;
		setRegisterPassword(registerPassword);
	};

	// const handleRegister = async () => {
	// 	try {
	// 		const newUser = await registerUserAPIMethod({
	// 			name: registerName,
	// 			email: registerEmail,
	// 			password: registerPassword,
	// 		});
	// 		setUser(newUser);
	// 	} catch (e) {
	// 		console.log('signupfailed');
	// 		console.error(e);
	// 		document.getElementById('register-error-msg').style.display = 'block';
	// 	}
	// };

	if (!show) {
		return null;
	}

	return (
		// NOTE delete div#register-modal to restore
		<div id="register-modal" onClick={onClose}>
			<div id="wrapper-register" onClick={(e) => e.stopPropagation()}>
				<div id="register-header">
					<h1 id="register-title">Sign Up</h1>
					<button id="btn-register-close" onClick={onClose}>
						X
					</button>
				</div>
				<div id="register-input">
					<label>Name</label>
					<input id="register-input-name" type="text" onChange={onChangeName} />
					<label>Email</label>
					<input
						id="register-input-email"
						type="text"
						onChange={onChangeEmail}
					/>
					<label>Password</label>
					<input
						id="register-input-password"
						type="text"
						onChange={onChangePassword}
					/>
				</div>
				<div id="register-error-msg">Error: Invalid email and/or password</div>
				<div id="btn-register-container">
					<button
						id="btn-register"
						// onClick={handleRegister}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}

export default Register;
