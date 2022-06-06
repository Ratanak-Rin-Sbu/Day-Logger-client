import React from 'react';
import { useState, useEffect } from 'react';
import ViewByQuestion from './ViewByQuestion';
import ViewByDate from './ViewByDate';

function ViewData({ questions, setQuestions }) {
	const [isViewByQuestion, setIsViewByQuestion] = useState(true);
	const [isViewByDate, setIsViewByDate] = useState(false);

	const openViewByQuestion = () => {
		setIsViewByQuestion(true);
		setIsViewByDate(false);
	};

	const openViewByDate = () => {
		setIsViewByQuestion(false);
		setIsViewByDate(true);
	};

	return (
		<div className='view-data'>
			<div className="navigation">
				<label
					className={`btn-view-data ${isViewByQuestion ? 'active' : ''}`}
					id="btn-open-view-by-question"
					onClick={openViewByQuestion}
				>
					View By Question
				</label>
				<label
					className={`btn-view-data ${isViewByDate ? 'active' : ''}`}
					id="btn-open-view-by-date"
					onClick={openViewByDate}
				>
					View By Date
				</label>
			</div>

			{isViewByQuestion && (
				<ViewByQuestion questions={questions} setQuestions={setQuestions} />
			)}
			{isViewByDate && (
				<ViewByDate questions={questions} setQuestions={setQuestions} />
			)}
		</div>
	);
}
export default ViewData;