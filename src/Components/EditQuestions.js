import React from 'react';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function EditQuestions() {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		GetQuestions();
	}, []);

	const GetQuestions = () => {
		fetch('http://localhost:5000/api/questions')
			.then((res) => res.json())
			.then((data) => setQuestions(data))
			.catch((err) => console.error('Error: ', err));
	};

	const editText = (newText, id) => {
		for (var i = 0; i < questions.length; i++) {
			if (questions[i]._id === id) {
				questions[i].text = newText;
				const data = {
					_id: id,
					text: newText,
					type: questions[i].type,
					date: questions[i].date,
					choices: questions[i].choices,
				};
				saveUpdatedQuestion(data);
			}
		}
		setQuestions([...questions]);
	};

	const editType = (type, id) => {
		for (var i = 0; i < questions.length; i++) {
			if (questions[i]._id === id) {
				questions[i].type = type;
				const data = {
					_id: id,
					text: questions[i].text,
					type: type,
					date: questions[i].date,
					choices: questions[i].choices,
				};
				saveUpdatedQuestion(data);
			}
		}
		setQuestions([...questions]);
	};

	const editChoices0 = (option, id) => {
		for (var i = 0; i < questions.length; i++) {
			if (questions[i]._id === id) {
				questions[i].choices[0] = option;
				const data = {
					_id: id,
					text: questions[i].text,
					type: questions[i].type,
					date: questions[i].date,
					choices: [option],
				};
				saveUpdatedQuestion(data);
			}
		}
		setQuestions([...questions]);
	};

	const editChoices1 = (option, id) => {
		for (var i = 0; i < questions.length; i++) {
			if (questions[i]._id === id) {
				questions[i].choices[1] = option;
				const data = {
					_id: id,
					text: questions[i].text,
					type: questions[i].type,
					date: questions[i].date,
					choices: [...questions[i].choices, option],
				};
				saveUpdatedQuestion(data);
			}
		}
		setQuestions([...questions]);
	};

	const editChoices2 = (option, id) => {
		for (var i = 0; i < questions.length; i++) {
			if (questions[i]._id === id) {
				questions[i].choices[2] = option;
				const data = {
					_id: id,
					text: questions[i].text,
					type: questions[i].type,
					date: questions[i].date,
					choices: [...questions[i].choices, option],
				};
				saveUpdatedQuestion(data);
			}
		}
		setQuestions([...questions]);
	};

	const addQuestion = async () => {
		const data = await fetch('http://localhost:5000/api/questions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				text: '',
				type: 'number',
				date: new Date().getDay(),
				choices: ['', '', ''],
			}),
		}).then((res) => res.json());

		setQuestions([data, ...questions]);
	};

	// const updateQuestion = (updatedQuestion) => {
	//   const updatedQuestionsArray = questions.map((question) => {
	//     if (question._id === updatedQuestion._id) {
	//       return updatedQuestion;
	//     }
	//     return question;
	//   });

	//   setQuestions(updatedQuestionsArray);
	// 	saveUpdatedQuestion()
	// };

	const saveUpdatedQuestion = async (updates) => {
		const data = await fetch(
			'http://localhost:5000/api/questions/' + updates._id,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: updates.text,
					type: updates.type,
					date: updates.date,
					choices: updates.choices,
				}),
			}
		).then((res) => res.json());
	};

	const deleteQuestion = async (idToDelete) => {
		const data = await fetch(
			'http://localhost:5000/api/questions/' + idToDelete,
			{
				method: 'DELETE',
			}
		).then((res) => res.json());
		setQuestions(questions.filter((question) => question._id !== idToDelete));
	};

	return (
		<div className="edit-questions">
			<div className="edit-questions-header">
				<h2 className="main-title">Edit Questions</h2>
				<div>
					<AddCircleOutlineIcon
						className="materialIcons"
						onClick={addQuestion}
					/>
				</div>
			</div>

			<div className="questions-list">
				{questions.map((question) => (
					<div className="questions" key={question._id}>
						<textarea
							className="input-question"
							onChange={(e) => editText(e.target.value, question._id)}
						>
							{question.text}
						</textarea>
						<div className="questions-header">
							<select
								className="question-types"
								defaultValue={question.type}
								onChange={(e) => editType(e.target.value, question._id)}
							>
								<option value="number">number</option>
								<option value="boolean">boolean</option>
								<option value="text">text</option>
								<option value="multiple-choice">multiple choice</option>
							</select>
							<div>
								<DeleteOutlineIcon
									onClick={(e) => deleteQuestion(question._id)}
								/>
							</div>
						</div>
						<div
							className={`choice ${
								question.type === 'multiple-choice' && 'active'
							}`}
						>
							<input type="radio"></input>
							<textarea
								className="input-choice"
								onChange={(e) => editChoices0(e.target.value, question._id)}
							>
								{question.choices[0]}
							</textarea>
						</div>
						<div
							className={`choice ${
								question.type === 'multiple-choice' && 'active'
							}`}
						>
							<input type="radio"></input>
							<textarea
								className="input-choice"
								onChange={(e) => editChoices1(e.target.value, question._id)}
							>
								{question.choices[1]}
							</textarea>
						</div>
						<div
							className={`choice ${
								question.type === 'multiple-choice' && 'active'
							}`}
						>
							<input type="radio"></input>
							<textarea
								className="input-choice"
								onChange={(e) => editChoices2(e.target.value, question._id)}
							>
								{question.choices[2]}
							</textarea>
						</div>
					</div>
				))}
			</div>

			<input
				className="save-questions"
				type="submit"
				value="Save"
				onClick={saveUpdatedQuestion}
			/>
		</div>
	);
}
// ${isMcq === true && "active"}
// ${isMcq === true && "active"}

export default EditQuestions;
