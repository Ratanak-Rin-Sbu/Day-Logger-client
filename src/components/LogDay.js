import React from 'react';
import debounce from 'lodash.debounce';
import { useState, useEffect } from 'react';
import { getQuestionsAPIMethod } from '../api/client';

function LogDay({ questions, setQuestions }) {
	const [numberResponses, setNumberResponses] = useState([]);
	let numberCounter = 0;  // for debouncing
	let numberCounter2 = 0; // for saving responses
	const [booleanResponses, setBooleanResponses] = useState([]);
	let booleanCounter = 0;
	let booleanCounter2 = 0;
	const [textResponses, setTextResponses] = useState([]);
	let textCounter = 0;
	let textCounter2 = 0;
	const [mcqResponses, setMcqResponses] = useState([]);
	let mcqCounter = 0;  // for debouncing
	let mcqCounter2 = 0; // for saving responses

	useEffect(() => {
		getQuestionsAPIMethod().then((questions) => {
			setQuestions(questions);
		});
	}, []);

	const findFirstNumber = () => {
		for (let i=0; i<questions.length; i++) {
			if (questions[i].type === 'number') {
				return questions[i]._id;
			}
		}
	}

	const findFirstBoolean = () => {
		for (let i=0; i<questions.length; i++) {
			if (questions[i].type === 'boolean') {
				return questions[i]._id;
			}
		}
	}

	const findFirstText = () => {
		for (let i=0; i<questions.length; i++) {
			if (questions[i].type === 'text') {
				return questions[i]._id;
			}
		}
	}

	const findFirstMcq = () => {
		for (let i=0; i<questions.length; i++) {
			if (questions[i].type === 'multiple-choice') {
				return questions[i]._id;
			}
		}
	}

	let numberID = findFirstNumber();
	let textID = findFirstText();
	let booleanID = findFirstBoolean();
	let mcqID = findFirstMcq();

	// debounce for number question
	const updateNumber = (newNumber, id) => {
		if (id === numberID) {
			numberResponses[numberCounter] = newNumber;
		} else {
			numberID = id;
			numberCounter++;
			numberResponses[numberCounter] = newNumber;
		}
	}
	const debounceOnChangeNumber = (newNumber, id) => {
		debounce(updateNumber(newNumber, id), 9000);
	}

	// debounce for text question
	const updateText = (newText, id) => {
		if (id === textID) {
			textResponses[textCounter] = newText;
		} else {
			textID = id;
			textCounter++;
			textResponses[textCounter] = newText;
		}
	}
	const debounceOnChangeText = (newText, id) => {
		debounce(updateText(newText, id), 9000);
	}

	// handle boolean (including multiple questions)
	const onChangeBoolean = (newBoolean, id) => {
		if (id === booleanID) {
			booleanResponses[booleanCounter] = newBoolean;
		} else {
			booleanID = id;
			booleanCounter++;
			booleanResponses[booleanCounter] = newBoolean;
		}
	}

	// handle mcq (including multiple questions)
	const onChangeMcq = (newMcq, id) => {
		if (id === mcqID) {
			mcqResponses[mcqCounter] = newMcq;
		} else {
			mcqID = id;
			mcqCounter++;
			mcqResponses[mcqCounter] = newMcq;
		}
	}

	const saveResponses = async () => {
		for (var i = 0; i < questions.length; i++) {
			if (questions[i].type === 'number') {
				const data = await fetch('/api/questions/' + questions[i]._id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						text: questions[i].text,
						type: questions[i].type,
						date: questions[i].date,
						choices: questions[i].choices,
						responses: numberResponses[numberCounter2++],
					}),
				})
					.then((res) => res.json())
					.catch((e) => console.log(e));
			} else if (questions[i].type === 'boolean') {
				console.log(booleanResponses);
				const data = await fetch('/api/questions/' + questions[i]._id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						text: questions[i].text,
						type: questions[i].type,
						date: questions[i].date,
						choices: questions[i].choices,
						responses: booleanResponses[booleanCounter2++],
					}),
				})
					.then((res) => res.json())
					.catch((e) => console.log(e));
			} else if (questions[i].type === 'text') {
				console.log(textResponses);
				const data = await fetch('/api/questions/' + questions[i]._id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						text: questions[i].text,
						type: questions[i].type,
						date: questions[i].date,
						choices: questions[i].choices,
						responses: textResponses[textCounter2++],
					}),
				})
					.then((res) => res.json())
					.catch((e) => console.log(e));
			} else {
				console.log(mcqResponses);
				const data = await fetch('/api/questions/' + questions[i]._id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						text: questions[i].text,
						type: questions[i].type,
						date: questions[i].date,
						choices: questions[i].choices,
						responses: mcqResponses[mcqCounter2++],
					}),
				})
					.then((res) => res.json())
					.catch((e) => console.log(e));
			}
		}
	};

	if (!questions.length) {
		return (
			<div className="logday-wrapper">
				<div className="date-wrapper">
					<button className="btn-prev-date">{'<'}</button>
					<div className="displaying-date">{}</div>
					<button className="btn-next-date">{'>'}</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className="logday-wrapper">
				<div className="date-wrapper">
					<button className="btn-prev-date">{'<'}</button>
					<div className="displaying-date">{questions[0].date}</div>
					<button className="btn-next-date">{'>'}</button>
				</div>

				<div className="questions-list">
					{questions.map((question) => (
						<div className="question" key={question._id}>
							<div className="question-text">{question.text}</div>
							{question.type === 'number' ? (
								<input
									className="number-type"
									onChange={(e) => debounceOnChangeNumber(e.target.value, question._id)}
								></input>
							) : question.type === 'boolean' ? (
								<div className="boolean">
									<input
										className="boolean-type"
										type="radio"
										name={question._id}
										value="True"
										onChange={(e) => onChangeBoolean(e.target.value, question._id)}
									></input>
									<div className="boolean-text">True</div>
									<input
										className="boolean-type"
										type="radio"
										name={question._id}
										value="False"
										onChange={(e) => onChangeBoolean(e.target.value, question._id)}
									></input>
									<div className="boolean-text">False</div>
								</div>
							) : question.type === 'text' ? (
								<input
									className="text-type"
									onChange={(e) => debounceOnChangeText(e.target.value, question._id)}
								></input>
							) : question.type === 'multiple-choice' ? (
								<div className="multiple-choice">
									<div className="choices">
										<input
											className="multiple-choice-type"
											type="radio"
											name={question._id}
											value={question.choices[0]}
											onChange={(e) => onChangeMcq(e.target.value, question._id)}
										></input>
										<div className="mcq-text">{question.choices[0]}</div>
									</div>
									<div className="choices">
										<input
											className="multiple-choice-type"
											type="radio"
											name={question._id}
											value={question.choices[1]}
											onChange={(e) => onChangeMcq(e.target.value, question._id)}
										></input>
										<div className="mcq-text">{question.choices[1]}</div>
									</div>
									<div className="choices">
										<input
											className="multiple-choice-type"
											type="radio"
											name={question._id}
											value={question.choices[2]}
											onChange={(e) => onChangeMcq(e.target.value, question._id)}
										></input>
										<div className="mcq-text">{question.choices[2]}</div>
									</div>
								</div>
							) : (
								''
							)}
						</div>
					))}
				</div>

				<input
					className="save-questions"
					type="submit"
					value="Submit"
					onClick={saveResponses}
				/>
			</div>
		);
	}
}

export default LogDay;
