const defaultHeaders = {
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`HTTP Error: ${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		console.log(error);
		throw error;
	}
}

function parseJSON(response) {
	return response.json();
}

// NOTE get all questions
export const getQuestionsAPIMethod = () => {
	return fetch(`/api/questions`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};
// REVIEW Nak's ver.
// const GetQuestions = () => {
//   fetch('http://localhost:5000/api/questions')
//     .then((res) => res.json())
//     .then((data) => setQuestions(data)) // NOTE not done in via API
//     .catch((err) => console.error('Error: ', err));
// };

// NOTE create new question
export const createQuestionAPIMethod = () => {
	return fetch(`/api/questions`, {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify({
			text: '',
			type: 'number',
			date: new Date().getDay(),
			choices: ['', '', ''],
		}),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE update a question
export const updateQuestionAPIMethod = (questionToUpdate) => {
	return fetch(`/api/questions/${questionToUpdate._id}`, {
		...defaultHeaders,
		method: 'PUT',
		body: JSON.stringify(questionToUpdate),
	}).then(checkStatus);
};

// NOTE delete a question
export const deleteQuestionAPIMethod = (questionId) => {
	return fetch(`/api/questions/${questionId}`, {
		...defaultHeaders,
		method: 'DELETE',
	})
		.then(checkStatus)
		.then(parseJSON);
};
