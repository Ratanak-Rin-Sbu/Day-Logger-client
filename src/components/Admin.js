import { useEffect, useState } from 'react';
import {
	deleteUserByIdAPIMethod,
	getQuestionsAPIMethod,
	getUsersAPIMethod,
} from '../api/client';

function Admin({ profile, setProfile }) {
	const [users, setUsers] = useState([]);
	let qCount = 0;
	let rCount = 0;

	useEffect(() => {
		getAllUsers();
	}, []);

	const getAllUsers = async () => {
		const fetchedUsers = await getUsersAPIMethod();
		console.table(fetchedUsers);
		setUsers(fetchedUsers);
	};

	const deleteUser = async (userId) => {
		console.log('DELETED USER');
		await deleteUserByIdAPIMethod(userId);
		const fetchedUsers = await getUsersAPIMethod();
		setUsers(fetchedUsers);
	};

	return (
		<div className="admin-wrapper">
			{users.map((user) => (
				<div className="user-info-wrapper" key={user._id}>
					<div className="user-info-label">
						<div className="info-box" id="user-name">
							User Name:
						</div>
						<div className="info-box" id="user-email">
							User Email:
						</div>
						<div className="info-box" id="total-question">
							Total Question Number:
						</div>
						<div className="info-box" id="total-response">
							Total Response Number:
						</div>
					</div>
					<div className="user-info">
						<div className="info-box" id="user-name">
							{user.name}
						</div>
						<div className="info-box" id="user-email">
							{user.email}
						</div>
						<div className="info-box" id="total-question">
							{qCount}
						</div>
						<div className="info-box" id="total-response">
							{rCount}
						</div>
					</div>
					<div className="btn-delete-container">
						<button id="btn-delete-users" onClick={() => deleteUser(user._id)}>
							DELETE
						</button>
					</div>
				</div>
			))}
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
