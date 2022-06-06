import { useEffect, useState } from 'react';
import { getQuestionsAPIMethod, getUsersAPIMethod } from '../api/client';

function Admin({ profile, setProfile }) {
	const [users, setUsers] = useState([]);
	console.table('logged in user: ', profile);
	console.log('isAdmin ???: ', profile.isAdmin);
	const getAllUsers = async () => {
		const fetchedUsers = await getUsersAPIMethod();
		console.table(fetchedUsers);
		setUsers(fetchedUsers);
	};
	useEffect(() => {
		getAllUsers();
	}, []);
	// const getAllUsers = async () => {
	// 	const fetchedUsers = await getUsersAPIMethod();
	// 	console.log(fetchedUsers);
	// 	return fetchedUsers;
	// };
	// const users = getAllUsers();
	// console.log('🚀 ~ file: Admin.js ~ line 21 ~ Admin ~ users', users);

	return (
		<div className="admin-wrapper">
			<div className="user-info">
				{users.map((user) => (
					<div className="user-info" key={user._id}>
						<div className="user-name">{user.name}</div>
						<div className="user-email">{user.email}</div>
					</div>
				))}
			</div>
		</div>
	);
}

// router.get(
//   "/users",
//   wrapAsync(async function (req, res) {
//     const users = await User.find().sort({
//       date: -1,
//     });
//     const returnUsers = await Promise.all(
//       users.map(async function (user) {
//         const questions = await Question.find({ user: user._id });
//         const responses = questions.map(
//           (q) => Object.keys(q.responses.toJSON()).length
//         );
//         const sum = responses.reduce((a, c) => a + c, 0);
//         return { ...user._doc, questions: questions.length, responses: sum };
//       })
//     );
//     res.json(returnUsers);
//   })
// );

export default Admin;
