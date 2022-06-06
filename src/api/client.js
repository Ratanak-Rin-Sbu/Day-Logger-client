const defaultHeaders = {
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

// NOTE create a question
export const createQuestionAPIMethod = (question) => {
	return fetch(`api/questions`, {
		...defaultHeaders,
		method: 'POST', // The method defaults to GET
		body: JSON.stringify(question),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE get all questions
export const getQuestionsAPIMethod = () => {
	return fetch(`api/questions`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE update questions
export const updateQuestionsAPIMethod = (questionId) => {
	return fetch(`api/questions/${questionId}`, {
		...defaultHeaders,
		method: 'PUT',
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE delete a question
export const deleteQuestionByIdAPIMethod = (questionId) => {
	return fetch(`api/questions/${questionId}`, {
		...defaultHeaders,
		method: 'DELETE',
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE create a number type response
export const createNumberResponseAPIMethod = (response) => {
	return fetch(`api/number/responses`, {
		...defaultHeaders,
		method: 'POST', // The method defaults to GET
		body: JSON.stringify(response),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE create a text type response
export const createTextResponseAPIMethod = (response) => {
	return fetch(`api/text/responses`, {
		...defaultHeaders,
		method: 'POST', // The method defaults to GET
		body: JSON.stringify(response),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE get number type responses
export const getNumberResponsesAPIMethod = () => {
	return fetch(`api/number/responses`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE get text type responses
export const getTextResponsesAPIMethod = () => {
	return fetch(`api/text/responses`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
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
	return fetch(`/api/register`, {
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

// NOTE get all users
export const getUsersAPIMethod = () => {
	return fetch(`/api/users`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// NOTE get a user
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

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		throw error;
	}
}

function parseJSON(response) {
	return response.json();
}
