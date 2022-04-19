export const BASE_URL = 'http://localhost:3000';

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject('Произошла ошибка')
  }
  return res.json();
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(handleResponse)
};

export const login = ({ email, password }) => {

  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
    .then(handleResponse)
};

export const logOut = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(handleResponse)
};
