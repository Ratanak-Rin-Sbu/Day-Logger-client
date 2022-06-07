import { useEffect, useState } from 'react';
// import { count } from '../../../server/models/question';
import {
	deleteUserByIdAPIMethod,
	deleteQuestionAPIMethod,
	getBooleanResponsesAdminAPIMethod,
	getNumberResponsesAdminAPIMethod,
	getQuestionsAdminAPIMethod,
	getTextResponsesAdminAPIMethod,
	getUsersAPIMethod,
	getMcqResponsesAdminAPIMethod,
} from '../api/client';

function Admin({ profile, setProfile }) {
	const [users, setUsers] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [numbers, setNumbers] = useState([]);
	const [booleans, setBooleans] = useState([]);
	const [texts, setTexts] = useState([]);
	const [mcqs, setMcqs] = useState([]);

	useEffect(() => {
		getUsersAPIMethod().then((users) => {
			setUsers(users);
		});
		getQuestionsAdminAPIMethod().then((questions) => {
			setQuestions(questions);
		});
		getNumberResponsesAdminAPIMethod().then((responses) => {
			setNumbers(responses);
		});
		getTextResponsesAdminAPIMethod().then((responses) => {
			setTexts(responses);
		});
		getBooleanResponsesAdminAPIMethod().then((responses) => {
			setBooleans(responses);
		});
		getMcqResponsesAdminAPIMethod().then((responses) => {
			setMcqs(responses);
		});
	}, []);

	console.dir(numbers);
	console.dir(booleans);
	console.dir(texts);
	console.dir(mcqs);

	const union = (number, boolean, text, mcq) => {
		const arr = [...number, ...boolean, ...text, ...mcq];
		console.dir(arr);
		return arr;
	};

	const deleteUser = async (userId) => {
		console.log('DELETED USER');
		await deleteUserByIdAPIMethod(userId);
		const fetchedUsers = await getUsersAPIMethod();
		setUsers(fetchedUsers);
	};

	if (
		!questions.length &&
		!users.length &&
		!numbers.length &&
		!booleans.length &&
		!texts.length &&
		!mcqs.length
	) {
		return '';
	} else {
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
								{
									questions.filter(
										(filteredQuestion) => filteredQuestion.agent === user._id
									).length
								}
							</div>
							<div className="info-box" id="total-response">
								{
									union(numbers, booleans, texts, mcqs).filter(
										(filteredResponse) => filteredResponse.agent === user._id
									).length
								}
							</div>
						</div>
						<div className="btn-delete-container">
							<button
								id="btn-delete-users"
								onClick={() => deleteUser(user._id)}
							>
								DELETE
							</button>
						</div>
					</div>
				))}
			</div>
		);
	}
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
