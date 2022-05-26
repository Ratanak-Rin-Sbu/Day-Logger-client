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

// NOTE register a user
export const registerUserAPIMethod = (user) => {
	return fetch('/api/register', {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE login a user
export const loginUserAPIMethod = (user) => {
	return fetch('/api/login', {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE logout a user
export const logoutUserAPIMethod = () => {
	return fetch('/api/logout', {
		...defaultHeaders,
		method: 'POST',
	}).then(checkStatus);
};

// ANCHOR get a user
export const getUserByIdAPIMethod = () => {
	return fetch(`/api/users/loggedInUser`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE update a user
export const updateUserAPIMethod = (user) => {
	return fetch(`/api/users`, {
		...defaultHeaders,
		method: 'PUT',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then();
};

// NOTE upload an image to Cloudinary
export const uploadImageToCloudinaryAPIMethod = (formData) => {
	const cloudName = 'sjchae-cloud';
	return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
		method: 'POST',
		body: formData,
	})
		.then(checkStatus)
		.then(parseJSON);
};
