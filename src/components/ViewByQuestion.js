import React from 'react'
import { useState, useEffect } from 'react';
import { BarChart, LineChart, Line, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
	getQuestionsAPIMethod,
	getNumberResponsesAPIMethod,
	getTextResponsesAPIMethod,
  getBooleanResponsesAPIMethod,
	getMcqResponsesAPIMethod } from '../api/client';

const ViewByQuestion = ({ questions, setQuestions }) => {
  const [savedNumberResponses, setSavedNumberResponses] = useState([]);
  const [savedBooleanResponses, setSavedBooleanResponses] = useState([]);
  const [savedTextResponses, setSavedTextResponses] = useState([]);
  const [savedMcqResponses, setSavedMcqResponses] = useState([]);

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

  const help = (arr) => {
    console.dir(arr);
    const sol = [];
    const arrResponses = [];
    const counts = {};
    for (let i=0; i<arr.length; i++) {
      arrResponses.push(arr[i].response);
    }
    console.dir(arrResponses);
    for (const num of arrResponses) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    sol.push(counts);
    console.dir(sol);
    return sol;
  }

  const data = [
    {
      React: 3,
      ExpressJS: 2,
      MongoDB: 1,
      
    },
  ]

  if (!questions.length) {
		return (
			""
		);
	} else {
    return (
      <div className='view-by-question'>
        <h2 className='main-title'>View Data by Question</h2>

        <div className='question-list'>
          {(savedNumberResponses.length || savedTextResponses.length || savedBooleanResponses.length || savedMcqResponses.length) ? (
            <div>
              {questions.map((question) => (
                <div className="question" key={question._id}>
                  <div className="question-text">{question.text}</div>
                  {question.type === 'number' ? (
                    <div>number</div>
                  ) : (question.type === 'boolean') ? (
                    <BarChart
                      width={500}
                      height={300}
                      data={help(savedBooleanResponses.filter((filteredResponse) => (filteredResponse.di === question._id)))}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis tick={false}/>
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="True" fill="#8884d8" />
                      <Bar dataKey="False" fill="#82ca9d" />
                    </BarChart>
                  ) : (question.type === 'text') ? (
                    <div>text</div>
                  ) : (
                    
                    <BarChart
                      width={500}
                      height={300}
                      data={help(savedMcqResponses.filter((filteredResponse) => (filteredResponse.di === question._id)))}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis tick={false}/>
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={question.choices[0]} fill="#8884d8" />
                      <Bar dataKey={question.choices[1]} fill="#82ca9d" />
                      <Bar dataKey={question.choices[2]} fill="#82cb8d" />
                    </BarChart>
                    
                  )}
                </div>
              ))}
            </div>
          ) : ""}
        </div>
      </div>
    )
  }
}

export default ViewByQuestion