import React from 'react';
import debounce from 'lodash.debounce';
import { useState, useEffect } from 'react';
import {
	getQuestionsAPIMethod,
	createNumberResponseAPIMethod,
	createTextResponseAPIMethod,
	createBooleanResponseAPIMethod,
	createMcqResponseAPIMethod,
	getNumberResponsesAPIMethod,
	getTextResponsesAPIMethod,
	getBooleanResponsesAPIMethod,
	getMcqResponsesAPIMethod,
} from '../api/client';

function LogDay({ questions, setQuestions }) {
	const [selectedDate, setSelectedDate] = useState(null);

	const [savedNumberResponses, setSavedNumberResponses] = useState([]);
	const [numberResponses, setNumberResponses] = useState([]);
	let numberCounter = 0;
	let numberCounter2 = 0;

	const [savedBooleanResponses, setSavedBooleanResponses] = useState([]);
	const [booleanResponses, setBooleanResponses] = useState([]);
	let booleanCounter = 0;
	let booleanCounter2 = 0;

	const [savedTextResponses, setSavedTextResponses] = useState([]);
	const [textResponses, setTextResponses] = useState([]);
	let textCounter = 0;
	let textCounter2 = 0;

	const [savedMcqResponses, setSavedMcqResponses] = useState([]);
	const [mcqResponses, setMcqResponses] = useState([]);
	let mcqCounter = 0;
	let mcqCounter2 = 0;

	useEffect(() => {
		getQuestionsAPIMethod().then((questions) => {
			setQuestions(questions);
		});
		getNumberResponsesAPIMethod().then((responses) => {
			setSavedNumberResponses(responses);
		});
		getTextResponsesAPIMethod().then((responses) => {
			setSavedTextResponses(responses);
		});
		getBooleanResponsesAPIMethod().then((responses) => {
			setSavedBooleanResponses(responses);
		});
		getMcqResponsesAPIMethod().then((responses) => {
			setSavedMcqResponses(responses);
		});
		setDate();
	}, []);

	const setDate = (newDate) => {
		const date = newDate || new Date();
		setSelectedDate(
			date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
		);
	};

	const getPrevDate = () => {
		const currentDayInMilli = new Date(selectedDate).getTime();
		const oneDay = 1000 * 60 * 60 * 24;
		const previousDayInMilli = currentDayInMilli - oneDay;
		const previousDate = new Date(previousDayInMilli);

		setDate(previousDate);
	};

	const getNextDate = () => {
		const currentDayInMilli = new Date(selectedDate).getTime();
		const oneDay = 1000 * 60 * 60 * 24;
		const nextDayInMilli = currentDayInMilli + oneDay;
		const nextDate = new Date(nextDayInMilli);

		setDate(nextDate);
	};

	const findFirstNumberID = () => {
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].type === 'number') {
				return questions[i]._id;
			}
		}
	};

	const findFirstBooleanID = () => {
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].type === 'boolean') {
				return questions[i]._id;
			}
		}
	};

	const findFirstTextID = () => {
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].type === 'text') {
				return questions[i]._id;
			}
		}
	};

	const findFirstMcqID = () => {
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].type === 'multiple-choice') {
				return questions[i]._id;
			}
		}
	};

	let numberID = findFirstNumberID();
	let textID = findFirstTextID();
	let booleanID = findFirstBooleanID();
	let mcqID = findFirstMcqID();

	// debounce for number question
	const updateNumber = (newNumber, id) => {
		if (id === numberID) {
			numberResponses[numberCounter] = newNumber;
		} else {
			numberID = id;
			numberCounter++;
			numberResponses[numberCounter] = newNumber;
		}
	};
	const debounceOnChangeNumber = (newNumber, id) => {
		debounce(updateNumber(newNumber, id), 5000);
	};

	// debounce for text question
	const updateText = (newText, id) => {
		if (id === textID) {
			textResponses[textCounter] = newText;
		} else {
			textID = id;
			textCounter++;
			textResponses[textCounter] = newText;
		}
	};
	const debounceOnChangeText = (newText, id) => {
		debounce(updateText(newText, id), 5000);
	};

	// handle boolean (including multiple questions)
	const onChangeBoolean = (newBoolean, id) => {
		if (id === booleanID) {
			booleanResponses[booleanCounter] = newBoolean;
		} else {
			booleanID = id;
			booleanCounter++;
			booleanResponses[booleanCounter] = newBoolean;
		}
	};

	// handle mcq (including multiple questions)
	const onChangeMcq = (newMcq, id) => {
		if (id === mcqID) {
			mcqResponses[mcqCounter] = newMcq;
		} else {
			mcqID = id;
			mcqCounter++;
			mcqResponses[mcqCounter] = newMcq;
		}
	};

	const deleteNumberResponse = async (idToDelete) => {
		const data = await fetch('/api/number/responses/' + idToDelete, {
			method: 'DELETE',
		}).then((res) => res.json());
		setSavedNumberResponses(
			savedNumberResponses.filter(
				(numberResponse) => numberResponse._id !== idToDelete
			)
		);
		console.log('Deleted');
	};

	const deleteBooleanResponse = async (idToDelete) => {
		const data = await fetch('/api/boolean/responses/' + idToDelete, {
			method: 'DELETE',
		}).then((res) => res.json());
		setSavedBooleanResponses(
			savedBooleanResponses.filter(
				(savedBooleanResponse) => savedBooleanResponse._id !== idToDelete
			)
		);
		console.log('Deleted');
	};

	const deleteTextResponse = async (idToDelete) => {
		const data = await fetch('/api/text/responses/' + idToDelete, {
			method: 'DELETE',
		}).then((res) => res.json());
		setSavedTextResponses(
			savedTextResponses.filter(
				(textResponse) => textResponse._id !== idToDelete
			)
		);
		console.log('Deleted');
	};

	const deleteMcqResponse = async (idToDelete) => {
		const data = await fetch('/api/mcq/responses/' + idToDelete, {
			method: 'DELETE',
		}).then((res) => res.json());
		setSavedMcqResponses(
			savedMcqResponses.filter((mcqResponse) => mcqResponse._id !== idToDelete)
		);
		console.log('Deleted');
	};

	const addResponse = (date) => {
		if (
			savedNumberResponses.filter((filtered) => filtered.date === selectedDate)
				.length ||
			savedBooleanResponses.filter((filtered) => filtered.date === selectedDate)
				.length ||
			savedTextResponses.filter((filtered) => filtered.date === selectedDate)
				.length ||
			savedMcqResponses.filter((filtered) => filtered.date === selectedDate)
				.length
		) {
			if (
				savedNumberResponses.filter(
					(filtered) => filtered.date === selectedDate
				).length
			) {
				for (
					let n = 0;
					n <
					savedNumberResponses.filter(
						(filtered) => filtered.date === selectedDate
					).length;
					n++
				) {
					deleteNumberResponse(
						savedNumberResponses.filter(
							(filtered) => filtered.date === selectedDate
						)[n]._id
					);
				}
			}
			if (
				savedTextResponses.filter((filtered) => filtered.date === selectedDate)
					.length
			) {
				for (
					let t = 0;
					t <
					savedTextResponses.filter(
						(filtered) => filtered.date === selectedDate
					).length;
					t++
				) {
					deleteTextResponse(
						savedTextResponses.filter(
							(filtered) => filtered.date === selectedDate
						)[t]._id
					);
				}
			}
			if (
				savedBooleanResponses.filter(
					(filtered) => filtered.date === selectedDate
				).length
			) {
				for (
					let b = 0;
					b <
					savedBooleanResponses.filter(
						(filtered) => filtered.date === selectedDate
					).length;
					b++
				) {
					deleteBooleanResponse(
						savedBooleanResponses.filter(
							(filtered) => filtered.date === selectedDate
						)[b]._id
					);
				}
			}
			if (
				savedMcqResponses.filter((filtered) => filtered.date === selectedDate)
					.length
			) {
				for (
					let m = 0;
					m <
					savedMcqResponses.filter((filtered) => filtered.date === selectedDate)
						.length;
					m++
				) {
					deleteMcqResponse(
						savedMcqResponses.filter(
							(filtered) => filtered.date === selectedDate
						)[m]._id
					);
				}
			}

			for (let i = 0; i < questions.length; i++) {
				if (questions[i].type === 'number') {
					const data = {
						response: numberResponses[numberCounter2++],
						date: date,
						di: questions[i]._id,
						type: questions[i].type,
					};
					createNumberResponseAPIMethod(data).then((response) => {
						console.log('Response created');
					});
				} else if (questions[i].type === 'boolean') {
					const data = {
						response: booleanResponses[booleanCounter2++],
						date: date,
						di: questions[i]._id,
						type: questions[i].type,
					};
					createBooleanResponseAPIMethod(data).then((response) => {
						console.log('Response created');
					});
				} else if (questions[i].type === 'text') {
					const data = {
						response: textResponses[textCounter2++],
						date: date,
						di: questions[i]._id,
						type: questions[i].type,
					};
					createTextResponseAPIMethod(data).then((response) => {
						console.log('Response created');
					});
				} else {
					const data = {
						response: mcqResponses[mcqCounter2++],
						date: date,
						di: questions[i]._id,
						type: questions[i].type,
					};
					createMcqResponseAPIMethod(data).then((response) => {
						console.log('Response created');
					});
				}
			}
		} else {
			for (let i = 0; i < questions.length; i++) {
				if (questions[i].type === 'number') {
					const data = {
						response: numberResponses[numberCounter2++],
						date: date,
						di: questions[i]._id,
						type: questions[i].type,
					};
					createNumberResponseAPIMethod(data).then((response) => {
						console.log('Response created');
					});
				} else if (questions[i].type === 'boolean') {
					const data = {
						response: booleanResponses[booleanCounter2++],
						date: date,
						di: questions[i]._id,
						type: questions[i].type,
					};
					createBooleanResponseAPIMethod(data).then((response) => {
						console.log('Response created');
					});
				} else if (questions[i].type === 'text') {
					const data = {
						response: textResponses[textCounter2++],
						date: date,
						di: questions[i]._id,
						type: questions[i].type,
					};
					createTextResponseAPIMethod(data).then((response) => {
						console.log('Response created');
					});
				} else {
					const data = {
						response: mcqResponses[mcqCounter2++],
						date: date,
						di: questions[i]._id,
						type: questions[i].type,
					};
					createMcqResponseAPIMethod(data).then((response) => {
						console.log('Response created');
					});
				}
			}
		}
	};

	const isEmpty = (id, arr) => {
		for (let i = 0; i < arr.length; i++) {
			if (id === arr[i].di) {
				return false;
			}
		}
		return true;
	};

	if (!questions.length) {
		return (
			<div className="logday-wrapper">
				<div className="date-wrapper">
					<button className="btn-prev-date" onClick={getPrevDate}>
						{'<'}
					</button>
					<div className="displaying-date">{}</div>
					<button className="btn-next-date" onClick={getNextDate}>
						{selectedDate === '6/7/2022' ? '' : '>'}
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div data-testid="logday" className="logday-wrapper">
				<div className="date-wrapper">
					<button className="btn-prev-date" onClick={getPrevDate}>
						{'<'}
					</button>
					{/* <div className="displaying-date">{questions[0].date}</div> */}
					{/* TODO we should display the today's date and then according to the date shown, we should show the corresponding responses :) */}
					<div className="displaying-date">{selectedDate}</div>
					<button className="btn-next-date" onClick={getNextDate}>
						{selectedDate === '6/7/2022' ? '' : '>'}
					</button>
				</div>

				<div className="questions-list">
					{savedNumberResponses.length ||
					savedTextResponses.length ||
					savedBooleanResponses.length ||
					savedMcqResponses.length ? (
						<div>
							{questions.map((question) => (
								<div className="question" key={question._id}>
									<div className="question-text">{question.text}</div>
									{question.type === 'number' ? (
										<div>
											{!savedNumberResponses.filter(
												(filteredResponse) =>
													filteredResponse.date === selectedDate
											).length ? (
												<input
													className="number-type"
													key={`${Math.floor(Math.random() * 1000)}-min`}
													defaultValue={''}
													onChange={(e) =>
														debounceOnChangeNumber(e.target.value, question._id)
													}
												></input>
											) : isEmpty(
													question._id,
													savedNumberResponses.filter(
														(filteredResponse) =>
															filteredResponse.date === selectedDate
													)
											  ) ? (
												<input
													className="number-type"
													key={`${Math.floor(Math.random() * 1000)}-min`}
													defaultValue={''}
													onChange={(e) =>
														debounceOnChangeNumber(e.target.value, question._id)
													}
												></input>
											) : (
												<div>
													{savedNumberResponses
														.filter(
															(filteredResponse) =>
																filteredResponse.date === selectedDate
														)
														.map((savedNumber, index) => (
															<div>
																{savedNumber.date === selectedDate &&
																savedNumber.di === question._id &&
																savedNumber.response ? (
																	<input
																		type="number"
																		className="number-type"
																		key={`${Math.floor(
																			Math.random() * 1000
																		)}-min`}
																		defaultValue={savedNumber.response}
																		onChange={(e) =>
																			debounceOnChangeNumber(
																				e.target.value,
																				question._id
																			)
																		}
																	></input>
																) : (
																	''
																)}
															</div>
														))}
												</div>
											)}
										</div>
									) : question.type === 'boolean' ? (
										<div>
											{!savedBooleanResponses.filter(
												(filteredResponse) =>
													filteredResponse.date === selectedDate
											).length ? (
												<div className="boolean">
													<input
														className="boolean-type"
														type="radio"
														name={question._id}
														value="True"
														onChange={(e) =>
															onChangeBoolean(e.target.value, question._id)
														}
													></input>
													<div className="boolean-text">True</div>
													<input
														className="boolean-type"
														type="radio"
														name={question._id}
														value="False"
														onChange={(e) =>
															onChangeBoolean(e.target.value, question._id)
														}
													></input>
													<div className="boolean-text">False</div>
												</div>
											) : isEmpty(
													question._id,
													savedBooleanResponses.filter(
														(filteredResponse) =>
															filteredResponse.date === selectedDate
													)
											  ) ? (
												<div className="boolean">
													<input
														className="boolean-type"
														type="radio"
														name={question._id}
														value="True"
														onChange={(e) =>
															onChangeBoolean(e.target.value, question._id)
														}
													></input>
													<div className="boolean-text">True</div>
													<input
														className="boolean-type"
														type="radio"
														name={question._id}
														value="False"
														onChange={(e) =>
															onChangeBoolean(e.target.value, question._id)
														}
													></input>
													<div className="boolean-text">False</div>
												</div>
											) : (
												<div>
													{savedBooleanResponses
														.filter(
															(filteredResponse) =>
																filteredResponse.date === selectedDate
														)
														.map((savedBoolean) => (
															<div>
																{question && !savedBoolean.response ? (
																	<div className="boolean">
																		<input
																			className="boolean-type"
																			type="radio"
																			name={question._id}
																			value="True"
																			onChange={(e) =>
																				onChangeBoolean(
																					e.target.value,
																					question._id
																				)
																			}
																		></input>
																		<div className="boolean-text">True</div>
																		<input
																			className="boolean-type"
																			type="radio"
																			name={question._id}
																			value="False"
																			onChange={(e) =>
																				onChangeBoolean(
																					e.target.value,
																					question._id
																				)
																			}
																		></input>
																		<div className="boolean-text">False</div>
																	</div>
																) : savedBoolean.date === selectedDate &&
																  savedBoolean.di === question._id &&
																  savedBoolean.response ? (
																	<div>
																		{savedBoolean.response === 'True' ? (
																			<div className="boolean">
																				<input
																					className="boolean-type"
																					type="radio"
																					name={question._id}
																					value="True"
																					checked="checked"
																					onChange={(e) =>
																						onChangeBoolean(
																							e.target.value,
																							question._id
																						)
																					}
																				></input>
																				<div className="boolean-text">True</div>
																				<input
																					className="boolean-type"
																					type="radio"
																					name={question._id}
																					value="False"
																					onChange={(e) =>
																						onChangeBoolean(
																							e.target.value,
																							question._id
																						)
																					}
																				></input>
																				<div className="boolean-text">
																					False
																				</div>
																			</div>
																		) : (
																			<div className="boolean">
																				<input
																					className="boolean-type"
																					type="radio"
																					name={question._id}
																					value="True"
																					onChange={(e) =>
																						onChangeBoolean(
																							e.target.value,
																							question._id
																						)
																					}
																				></input>
																				<div className="boolean-text">True</div>
																				<input
																					className="boolean-type"
																					type="radio"
																					name={question._id}
																					value="False"
																					checked="checked"
																					onChange={(e) =>
																						onChangeBoolean(
																							e.target.value,
																							question._id
																						)
																					}
																				></input>
																				<div className="boolean-text">
																					False
																				</div>
																			</div>
																		)}
																	</div>
																) : (
																	''
																)}
															</div>
														))}
												</div>
											)}
										</div>
									) : question.type === 'text' ? (
										<div>
											{!savedTextResponses.filter(
												(filteredResponse) =>
													filteredResponse.date === selectedDate
											).length ? (
												<input
													className="text-type"
													key={`${Math.floor(Math.random() * 1000)}-min`}
													defaultValue={''}
													onChange={(e) =>
														debounceOnChangeText(e.target.value, question._id)
													}
												></input>
											) : isEmpty(
													question._id,
													savedTextResponses.filter(
														(filteredResponse) =>
															filteredResponse.date === selectedDate
													)
											  ) ? (
												<input
													className="text-type"
													key={`${Math.floor(Math.random() * 1000)}-min`}
													defaultValue={''}
													onChange={(e) =>
														debounceOnChangeText(e.target.value, question._id)
													}
												></input>
											) : (
												<div>
													{savedTextResponses
														.filter(
															(filteredResponse) =>
																filteredResponse.date === selectedDate
														)
														.map((savedText) => (
															<div>
																{savedText.date === selectedDate &&
																savedText.di === question._id &&
																savedText.response ? (
																	<input
																		className="text-type"
																		key={`${Math.floor(
																			Math.random() * 1000
																		)}-min`}
																		defaultValue={savedText.response}
																		onChange={(e) =>
																			debounceOnChangeText(
																				e.target.value,
																				question._id
																			)
																		}
																	></input>
																) : (
																	''
																)}
															</div>
														))}
												</div>
											)}
										</div>
									) : question.type === 'multiple-choice' ? (
										<div>
											{!savedMcqResponses.filter(
												(filteredResponse) =>
													filteredResponse.date === selectedDate
											).length ? (
												<div>
													<div className="choices">
														<input
															className="multiple-choice-type"
															type="radio"
															name={question._id}
															value={question.choices[0]}
															onChange={(e) =>
																onChangeMcq(e.target.value, question._id)
															}
														></input>
														<div className="mcq-text">
															{question.choices[0]}
														</div>
													</div>
													<div className="choices">
														<input
															className="multiple-choice-type"
															type="radio"
															name={question._id}
															value={question.choices[1]}
															onChange={(e) =>
																onChangeMcq(e.target.value, question._id)
															}
														></input>
														<div className="mcq-text">
															{question.choices[1]}
														</div>
													</div>
													<div className="choices">
														<input
															className="multiple-choice-type"
															type="radio"
															name={question._id}
															value={question.choices[2]}
															onChange={(e) =>
																onChangeMcq(e.target.value, question._id)
															}
														></input>
														<div className="mcq-text">
															{question.choices[2]}
														</div>
													</div>
												</div>
											) : isEmpty(
													question._id,
													savedMcqResponses.filter(
														(filteredResponse) =>
															filteredResponse.date === selectedDate
													)
											  ) ? (
												<div>
													<div className="choices">
														<input
															className="multiple-choice-type"
															type="radio"
															name={question._id}
															value={question.choices[0]}
															onChange={(e) =>
																onChangeMcq(e.target.value, question._id)
															}
														></input>
														<div className="mcq-text">
															{question.choices[0]}
														</div>
													</div>
													<div className="choices">
														<input
															className="multiple-choice-type"
															type="radio"
															name={question._id}
															value={question.choices[1]}
															onChange={(e) =>
																onChangeMcq(e.target.value, question._id)
															}
														></input>
														<div className="mcq-text">
															{question.choices[1]}
														</div>
													</div>
													<div className="choices">
														<input
															className="multiple-choice-type"
															type="radio"
															name={question._id}
															value={question.choices[2]}
															onChange={(e) =>
																onChangeMcq(e.target.value, question._id)
															}
														></input>
														<div className="mcq-text">
															{question.choices[2]}
														</div>
													</div>
												</div>
											) : (
												<div>
													{savedMcqResponses
														.filter(
															(filteredResponse) =>
																filteredResponse.date === selectedDate
														)
														.map((savedMcq) => (
															<div>
																{savedMcq.date === selectedDate &&
																savedMcq.di === question._id &&
																savedMcq.response ? (
																	<div>
																		{savedMcq.response ===
																		question.choices[0] ? (
																			<div>
																				<div className="choices">
																					<input
																						className="multiple-choice-type"
																						type="radio"
																						name={question._id}
																						value={question.choices[0]}
																						checked="checked"
																						onChange={(e) =>
																							onChangeMcq(
																								e.target.value,
																								question._id
																							)
																						}
																					></input>
																					<div className="mcq-text">
																						{question.choices[0]}
																					</div>
																				</div>
																				<div className="choices">
																					<input
																						className="multiple-choice-type"
																						type="radio"
																						name={question._id}
																						value={question.choices[1]}
																						onChange={(e) =>
																							onChangeMcq(
																								e.target.value,
																								question._id
																							)
																						}
																					></input>
																					<div className="mcq-text">
																						{question.choices[1]}
																					</div>
																				</div>
																				<div className="choices">
																					<input
																						className="fnu-type"
																						type="radio"
																						name={question._id}
																						value={question.choices[2]}
																						onChange={(e) =>
																							onChangeMcq(
																								e.target.value,
																								question._id
																							)
																						}
																					></input>
																					<div className="mcq-text">
																						{question.choices[2]}
																					</div>
																				</div>
																			</div>
																		) : savedMcq.response ===
																		  question.choices[1] ? (
																			<div>
																				<div className="choices">
																					<input
																						className="multiple-choice-type"
																						type="radio"
																						name={question._id}
																						value={question.choices[0]}
																						onChange={(e) =>
																							onChangeMcq(
																								e.target.value,
																								question._id
																							)
																						}
																					></input>
																					<div className="mcq-text">
																						{question.choices[0]}
																					</div>
																				</div>
																				<div className="choices">
																					<input
																						className="multiple-choice-type"
																						type="radio"
																						name={question._id}
																						value={question.choices[1]}
																						checked="checked"
																						onChange={(e) =>
																							onChangeMcq(
																								e.target.value,
																								question._id
																							)
																						}
																					></input>
																					<div className="mcq-text">
																						{question.choices[1]}
																					</div>
																				</div>
																				<div className="choices">
																					<input
																						className="multiple-choice-type"
																						type="radio"
																						name={question._id}
																						value={question.choices[2]}
																						onChange={(e) =>
																							onChangeMcq(
																								e.target.value,
																								question._id
																							)
																						}
																					></input>
																					<div className="mcq-text">
																						{question.choices[2]}
																					</div>
																				</div>
																			</div>
																		) : (
																			<div>
																				<div className="choices">
																					<input
																						className="multiple-choice-type"
																						type="radio"
																						name={question._id}
																						value={question.choices[0]}
																						onChange={(e) =>
																							onChangeMcq(
																								e.target.value,
																								question._id
																							)
																						}
																					></input>
																					<div className="mcq-text">
																						{question.choices[0]}
																					</div>
																				</div>
																				<div className="choices">
																					<input
																						className="multiple-choice-type"
																						type="radio"
																						name={question._id}
																						value={question.choices[1]}
																						onChange={(e) =>
																							onChangeMcq(
																								e.target.value,
																								question._id
																							)
																						}
																					></input>
																					<div className="mcq-text">
																						{question.choices[1]}
																					</div>
																				</div>
																				<div className="choices">
																					<input
																						className="multiple-choice-type"
																						type="radio"
																						name={question._id}
																						value={question.choices[2]}
																						checked="checked"
																						onChange={(e) =>
																							onChangeMcq(
																								e.target.value,
																								question._id
																							)
																						}
																					></input>
																					<div className="mcq-text">
																						{question.choices[2]}
																					</div>
																				</div>
																			</div>
																		)}
																	</div>
																) : (
																	''
																)}
															</div>
														))}
												</div>
											)}
										</div>
									) : (
										''
									)}
								</div>
							))}
						</div>
					) : (
						<div>
							{questions.map((question) => (
								<div className="question" key={question._id}>
									<div className="question-text">{question.text}</div>
									<div>
										{question.type === 'number' ? (
											<input
												type="number"
												className="number-type"
												key={`${Math.floor(Math.random() * 1000)}-min`}
												defaultValue={''}
												onChange={(e) =>
													debounceOnChangeNumber(e.target.value, question._id)
												}
											></input>
										) : question.type === 'boolean' ? (
											<div className="boolean">
												<input
													className="boolean-type"
													type="radio"
													name={question._id}
													value="True"
													onChange={(e) =>
														onChangeBoolean(e.target.value, question._id)
													}
												></input>
												<div className="boolean-text">True</div>
												<input
													className="boolean-type"
													type="radio"
													name={question._id}
													value="False"
													onChange={(e) =>
														onChangeBoolean(e.target.value, question._id)
													}
												></input>
												<div className="boolean-text">False</div>
											</div>
										) : question.type === 'text' ? (
											<input
												className="text-type"
												key={`${Math.floor(Math.random() * 1000)}-min`}
												defaultValue={''}
												onChange={(e) =>
													debounceOnChangeText(e.target.value, question._id)
												}
											></input>
										) : question.type === 'multiple-choice' ? (
											<div className="multiple-choice">
												<div className="choices">
													<input
														className="multiple-choice-type"
														type="radio"
														name={question._id}
														value={question.choices[0]}
														onChange={(e) =>
															onChangeMcq(e.target.value, question._id)
														}
													></input>
													<div className="mcq-text">{question.choices[0]}</div>
												</div>
												<div className="choices">
													<input
														className="multiple-choice-type"
														type="radio"
														name={question._id}
														value={question.choices[1]}
														onChange={(e) =>
															onChangeMcq(e.target.value, question._id)
														}
													></input>
													<div className="mcq-text">{question.choices[1]}</div>
												</div>
												<div className="choices">
													<input
														className="multiple-choice-type"
														type="radio"
														name={question._id}
														value={question.choices[2]}
														onChange={(e) =>
															onChangeMcq(e.target.value, question._id)
														}
													></input>
													<div className="mcq-text">{question.choices[2]}</div>
												</div>
											</div>
										) : (
											''
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<input
					className="save-questions"
					type="submit"
					value="Submit"
					onClick={() => addResponse(selectedDate)}
				></input>
			</div>
		);
	}
}

export default LogDay;
