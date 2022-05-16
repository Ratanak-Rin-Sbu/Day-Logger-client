import { useState, useEffect } from 'react';

import Login from './Components/Login';
import Home from './Home';

function App() {
	const [profile, setProfile] = useState();
	const [isLogin, setIsLogin] = useState(true);

	// NOTE autoLogin
	// useEffect(() => {
	// 	const autoLogin = async () => {
	// 		try {
	// 			const user = await getUserByIdAPIMethod();
	// 			if (user) {
	// 				setProfile(user);
	// 			}
	// 		} catch (e) {
	// 			console.log('there is no such session or expired');
	// 			return;
	// 		}
	// 	};
	// 	autoLogin();
	// }, []);

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
