import React from 'react';
import { useState, useEffect } from 'react';
import ViewByQuestion from './ViewByQuestion';
import ViewByDate from './ViewByDate';
import {
	getQuestionsAPIMethod,
	getNumberResponsesAPIMethod,
	getTextResponsesAPIMethod,
	getBooleanResponsesAPIMethod,
	getMcqResponsesAPIMethod,
} from '../api/client';

function ViewData({ questions, setQuestions }) {
	const [isViewByQuestion, setIsViewByQuestion] = useState(true);
	const [isViewByDate, setIsViewByDate] = useState(false);
	const [savedNumberResponses, setSavedNumberResponses] = useState([]);
	const [savedBooleanResponses, setSavedBooleanResponses] = useState([]);
	const [savedTextResponses, setSavedTextResponses] = useState([]);
	const [savedMcqResponses, setSavedMcqResponses] = useState([]);

	const [exportingCSVData, setExportingCSVData] = useState([]);

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
	}, []);

	const getExportMapArray = () => {
		const header = `question,response,date,type`;
		const questionStringArr = questions.map((question) => {
			const type = question.type;
			const date = question.date;
			const _id = question._id;
			let dataRow = '';
			if (type === 'number') {
				const aObj = savedNumberResponses.filter((ans) => {
					return ans.di === _id;
				})[0];
				dataRow = `${question.text},${aObj.response},${date},${type}`;
			} else if (type === 'text') {
				const aObj = savedTextResponses.filter((ans) => {
					return ans.di === _id;
				})[0];
				dataRow = `${question.text},${aObj.response},${date},${type}`;
			} else if (type === 'boolean') {
				const aObj = savedBooleanResponses.filter((ans) => {
					return ans.di === _id;
				})[0];
				dataRow = `${question.text},${aObj.response},${date},${type}`;
			} else if (type === 'multiple-choice') {
				const aObj = savedMcqResponses.filter((ans) => {
					return ans.di === _id;
				})[0];
				dataRow = `${question.text},${aObj.response},${date},${type}`;
			}
			return dataRow;
		});
		const res = `${header}
${questionStringArr.join('\n')}
    `;
		console.log(res);
		setExportingCSVData(res);
		const link = document.createElement('a');
		const uri = encodeURIComponent(res);
		link.href = `data:text/plain;charset=utf-8,${uri}`;
		document.body.appendChild(link);
		// const event = new Event('click');
		link.download = 'logged-data.csv';
		link.style.display = 'none';
		link.click();
		document.body.removeChild(link);
	};

	const openViewByQuestion = () => {
		setIsViewByQuestion(true);
		setIsViewByDate(false);
	};

	const openViewByDate = () => {
		setIsViewByQuestion(false);
		setIsViewByDate(true);
	};

	return (
		<div className="view-data">
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
				<button onClick={getExportMapArray} className="btn-csv">
					CSV
				</button>
			</div>

			{isViewByQuestion && (
				<ViewByQuestion
					questions={questions}
					setQuestions={setQuestions}
					savedNumberResponses={savedNumberResponses}
					savedBooleanResponses={savedBooleanResponses}
					savedTextResponses={savedTextResponses}
					savedMcqResponses={savedMcqResponses}
				/>
			)}
			{isViewByDate && (
				<ViewByDate
					questions={questions}
					setQuestions={setQuestions}
					savedNumberResponses={savedNumberResponses}
					savedBooleanResponses={savedBooleanResponses}
					savedTextResponses={savedTextResponses}
					savedMcqResponses={savedMcqResponses}
				/>
			)}
		</div>
	);
}
export default ViewData;
