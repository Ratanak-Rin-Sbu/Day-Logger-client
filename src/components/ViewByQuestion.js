import React from 'react';
import { useState, useEffect } from 'react';
import {
	BarChart,
	LineChart,
	Line,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const ViewByQuestion = ({
	questions,
	setQuestions,
	savedNumberResponses,
	savedBooleanResponses,
	savedTextResponses,
	savedMcqResponses,
}) => {
	const help = (arr) => {
		console.dir(arr);
		const sol = [];
		const arrResponses = [];
		const counts = {};
		for (let i = 0; i < arr.length; i++) {
			arrResponses.push(arr[i].response);
		}
		console.dir(arrResponses);
		for (const num of arrResponses) {
			counts[num] = counts[num] ? counts[num] + 1 : 1;
		}
		sol.push(counts);
		console.dir(sol);
		return sol;
	};

	const data = [
		{
			React: 3,
			ExpressJS: 2,
			MongoDB: 1,
		},
	];

	if (!questions.length) {
		return '';
	} else {
		return (
			<div className="view-by-question">
				<h2 className="main-title">View Data by Question</h2>

				<div className="question-list">
					{savedNumberResponses.length ||
					savedTextResponses.length ||
					savedBooleanResponses.length ||
					savedMcqResponses.length ? (
						<div>
							{questions.map((question) => (
								<div className="question" key={question._id}>
									<div className="question-text">{question.text}</div>
									{question.type === 'number' ? (
										<LineChart
											width={800}
											height={300}
											data={savedNumberResponses.filter(
												(filteredResponse) =>
													filteredResponse.di === question._id
											)}
											margin={{
												top: 5,
												right: 30,
												left: 20,
												bottom: 5,
											}}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="date" />
											<YAxis />
											<Tooltip />
											<Legend />
											<Line
												type="monotone"
												dataKey="response"
												stroke="#8884d8"
												activeDot={{ r: 8 }}
											/>
										</LineChart>
									) : question.type === 'boolean' ? (
										<BarChart
											width={500}
											height={300}
											data={help(
												savedBooleanResponses.filter(
													(filteredResponse) =>
														filteredResponse.di === question._id
												)
											)}
											margin={{
												top: 5,
												right: 30,
												left: 20,
												bottom: 5,
											}}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis tick={false} />
											<YAxis />
											<Tooltip />
											<Legend />
											<Bar dataKey="True" fill="#8884d8" />
											<Bar dataKey="False" fill="#82ca9d" />
										</BarChart>
									) : question.type === 'text' ? (
										<div>
											{savedTextResponses
												.filter(
													(filteredResponse) =>
														filteredResponse.di === question._id
												)
												.map((savedText) => (
													<div className="text-response">
														<div className="response">{savedText.response}</div>
														<div className="date">{savedText.date}</div>
													</div>
												))}
										</div>
									) : (
										<BarChart
											width={500}
											height={300}
											data={help(
												savedMcqResponses.filter(
													(filteredResponse) =>
														filteredResponse.di === question._id
												)
											)}
											margin={{
												top: 5,
												right: 30,
												left: 20,
												bottom: 5,
											}}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis tick={false} />
											<YAxis />
											<Tooltip />
											<Legend />
											<Bar dataKey={question.choices[0]} fill="#8884d8" />
											<Bar dataKey={question.choices[1]} fill="#82ca9d" />
											<Bar dataKey={question.choices[2]} fill="#4169e1" />
										</BarChart>
									)}
								</div>
							))}
						</div>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
};

export default ViewByQuestion;
