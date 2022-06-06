import React from 'react';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { createQuestionAPIMethod, getQuestionsAPIMethod } from '../api/client';

function EditQuestions({
	questions,
	setQuestions,
	addQuestion,
	deleteQuestion,
}) {

	useEffect(() => {
		getQuestionsAPIMethod().then((questions) => {
			setQuestions(questions);
		});
	}, []);

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

	const saveUpdatedQuestion = async (updates) => {
		const data = await fetch('/api/questions/' + updates._id, {
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
		}).then((res) => res.json());
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
					<div className="question" key={question._id}>
						<input
							className="input-question"
							value={question.text}
							onChange={(e) => editText(e.target.value, question._id)}
						/>
						<div className="question-header">
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
									// onClick={(e) => handleDeleteQeustion(question._id)}
								/>
							</div>
						</div>
						<div
							className={`choice ${
								question.type === 'multiple-choice' && 'active'
							}`}
						>
							<input type="radio"></input>
							<input
								className="input-choice"
								value={question.choices[0]}
								onChange={(e) => editChoices0(e.target.value, question._id)}
							/>
						</div>
						<div
							className={`choice ${
								question.type === 'multiple-choice' && 'active'
							}`}
						>
							<input type="radio"></input>
							<input
								className="input-choice"
								value={question.choices[1]}
								onChange={(e) => editChoices1(e.target.value, question._id)}
							/>
						</div>
						<div
							className={`choice ${
								question.type === 'multiple-choice' && 'active'
							}`}
						>
							<input type="radio"></input>
							<input
								className="input-choice"
								value={question.choices[2]}
								onChange={(e) => editChoices2(e.target.value, question._id)}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default EditQuestions;
