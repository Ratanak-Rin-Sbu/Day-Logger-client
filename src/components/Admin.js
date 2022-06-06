import { useEffect } from 'react';
import { getQuestionsAPIMethod, getUsersAPIMethod } from '../api/client';

function Admin({ profile, setProfile }) {
	useEffect(() => {
		// getUsersAPIMethod().then((response) => {
		// 	console.table(response);
		// });
		console.table(profile);
		console.log('isAdmin ???: ', profile.isAdmin);
		const getAllUsers = async () => {
			const allUsers = await getUsersAPIMethod();
			console.table(allUsers);
		};
		getAllUsers();
	}, []);

	return (
		<div className="admin-wrapper">
			<div className="unauthorized">
				<p>You do not have access to this page</p>
				<p>You must be logged in as an administrator</p>
			</div>
			<div className="user-info">
				map users here
				{/* FIXME map is not a function? profile is a funciton not an array? */}
				{/* {profile.map((prof) => (
					<div className="user-name" key={prof._id}>
						{prof.name}
					</div>
				))} */}
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
