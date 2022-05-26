import { useState, useEffect } from 'react';
import Home from './Home';
import Login from './components/Login';
import { getUserByIdAPIMethod } from './api/client';

function App() {
	const [profile, setProfile] = useState();
	const [isLogin, setIsLogin] = useState(true);

	// REVIEW source form previous assignment; review and change before use
	// NOTE autoLogin function

	useEffect(() => {}, []);

	useEffect(() => {
		const autoLogin = async () => {
			try {
				const user = await getUserByIdAPIMethod();
				if (user) {
					setProfile(user);
				}
			} catch (e) {
				console.log('there is no such session or expired');
				return;
			}
		};
		autoLogin();
	}, []);

	return (
		<>
			{profile ? (
				<Home
					profile={profile}
					setProfile={setProfile}
					setIsLogin={setIsLogin}
				/>
			) : isLogin ? (
				<Login setProfile={setProfile} setIsLogin={setIsLogin} />
			) : null}
		</>
	);
}

export default App;
