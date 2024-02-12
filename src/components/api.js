const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    authorization: '3dc1da83-ee0d-4bed-9320-1010944bf165',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
}

function getUserData() {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: apiConfig.headers
  }).then(res => checkResponse(res));
}

function getCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: apiConfig.headers
  }).then(res => checkResponse(res));
}

function patchProfile(data) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  }).then(res => checkResponse(res));
}

function postNewCard(data) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  }).then(res => checkResponse(res));
}

function cardDelete(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
    .then(res => checkResponse(res))
    .catch(err => console.log(err));
}

function likeCard(Id, method) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${Id}`, {
    method: method,
    headers: apiConfig.headers
  }).then(res => checkResponse(res));
}

function patchAvatar(url) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(url)
  }).then(res => checkResponse(res));
}

export { getCards, getUserData, patchProfile, postNewCard, cardDelete, likeCard, patchAvatar };
