import React from 'react';
import { useState, useEffect } from 'react';

const ViewByDate = ({
	questions,
	setQuestions,
	savedNumberResponses,
	savedBooleanResponses,
	savedTextResponses,
	savedMcqResponses,
}) => {
	const [selectedDate, setSelectedDate] = useState(null);

	useEffect(() => {
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

	if (!questions.length) {
		return '';
	} else {
		return (
			<div className="logday-wrapper">
				<h2 className="main-title">View Data by Days</h2>
				<div className="date-wrapper">
					<button className="btn-prev-date" onClick={getPrevDate}>
						{'<'}
					</button>
					<div className="displaying-date">{selectedDate}</div>
					<button className="btn-next-date" onClick={getNextDate}>
						{'>'}
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
													readOnly
												></input>
											) : (
												<div>
													{savedNumberResponses
														.filter(
															(filteredResponse) =>
																filteredResponse.date === selectedDate
														)
														.map((savedNumber) => (
															<div>
																{savedNumber.date === selectedDate &&
																savedNumber.di === question._id &&
																savedNumber.response ? (
																	<input
																		className="number-type"
																		key={`${Math.floor(
																			Math.random() * 1000
																		)}-min`}
																		defaultValue={savedNumber.response}
																		readOnly
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
														disabled
													></input>
													<div className="boolean-text">True</div>
													<input
														className="boolean-type"
														type="radio"
														name={question._id}
														value="False"
														disabled
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
																		></input>
																		<div className="boolean-text">True</div>
																		<input
																			className="boolean-type"
																			type="radio"
																			name={question._id}
																			value="False"
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
																				></input>
																				<div className="boolean-text">True</div>
																				<input
																					className="boolean-type"
																					type="radio"
																					name={question._id}
																					value="False"
																					disabled
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
																					disabled
																				></input>
																				<div className="boolean-text">True</div>
																				<input
																					className="boolean-type"
																					type="radio"
																					name={question._id}
																					value="False"
																					checked="checked"
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
													readOnly
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
																		readOnly
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
															disabled
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
															disabled
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
															disabled
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
																						disabled
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
																						disabled
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
																						disabled
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
																						disabled
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
																						disabled
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
																						disabled
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
												className="number-type"
												key={`${Math.floor(Math.random() * 1000)}-min`}
												defaultValue={''}
												readOnly
											></input>
										) : question.type === 'boolean' ? (
											<div className="boolean">
												<input
													className="boolean-type"
													type="radio"
													name={question._id}
													value="True"
													disabled
												></input>
												<div className="boolean-text">True</div>
												<input
													className="boolean-type"
													type="radio"
													name={question._id}
													value="False"
													disabled
												></input>
												<div className="boolean-text">False</div>
											</div>
										) : question.type === 'text' ? (
											<input
												className="text-type"
												key={`${Math.floor(Math.random() * 1000)}-min`}
												defaultValue={''}
												readOnly
											></input>
										) : question.type === 'multiple-choice' ? (
											<div className="multiple-choice">
												<div className="choices">
													<input
														className="multiple-choice-type"
														type="radio"
														name={question._id}
														value={question.choices[0]}
														disabled
													></input>
													<div className="mcq-text">{question.choices[0]}</div>
												</div>
												<div className="choices">
													<input
														className="multiple-choice-type"
														type="radio"
														name={question._id}
														value={question.choices[1]}
														disabled
													></input>
													<div className="mcq-text">{question.choices[1]}</div>
												</div>
												<div className="choices">
													<input
														className="multiple-choice-type"
														type="radio"
														name={question._id}
														value={question.choices[2]}
														disabled
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
			</div>
		);
	}
};

export default ViewByDate;
