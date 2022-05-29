const defaultHeaders = {
  headers: {
      'Content-Type': 'application/json; charset=UTF-8'
  },
}

export const createQuestionAPIMethod = (question) => {
  return fetch(`api/questions`, {
      ...defaultHeaders,
      method: 'POST', // The method defaults to GET
      body: JSON.stringify(question),
  }).then(checkStatus)
      .then(parseJSON);
}

export const getQuestionsAPIMethod = () => {
  return fetch(`api/questions`, {
      ...defaultHeaders,
  }).then(checkStatus)
      .then(parseJSON);
}

export const updateQuestionsAPIMethod = (questionId) => {
  return fetch(`api/questions/${questionId}`, {
      ...defaultHeaders,
      method: 'PUT',
  }).then(checkStatus)
      .then(parseJSON);
}

export const deleteQuestionByIdAPIMethod = (questionId) => {
  return fetch(`api/questions/${questionId}`, {
      ...defaultHeaders,
      method: 'DELETE',
  }).then(checkStatus)
      .then(parseJSON);
}

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