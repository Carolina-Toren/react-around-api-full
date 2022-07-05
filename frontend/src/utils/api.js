const customFetch = (url, headers) =>
	fetch(url, headers).then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)));

export class Api {
	constructor({baseUrl, headers}) {
		this._baseUrl = baseUrl;

		this._headers = headers;
	}

	customFetch(url, headers) {
		return fetch(url, headers).then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)));
	}

	getInitialCards() {
		return customFetch(`${this._baseUrl}/cards`, {headers: this._headers});
	}

	getUserInfo() {
		return customFetch(`${this._baseUrl}/users/me`, {headers: this._headers});
	}

	getUserImg() {
		return customFetch(`${this._baseUrl}/users/me/avatar`, {
			headers: this._headers,
		});
	}

	deleteCard(cardId) {
		return customFetch(`${this._baseUrl}/cards/${cardId} `, {
			headers: this._headers,
			method: 'DELETE',
		});
	}

	_likeCard(cardId) {
		return customFetch(`${this._baseUrl}/cards/likes/${cardId} `, {
			headers: this._headers,
			method: 'PUT',
		});
	}

	_dislikeCard(cardId) {
		return customFetch(`${this._baseUrl}/cards/likes/${cardId} `, {
			headers: this._headers,
			method: 'DELETE',
		});
	}

	changeLikeCardStatus(cardID, isLiked) {
		if (isLiked) {
			return this._likeCard(cardID);
		} else {
			return this._dislikeCard(cardID);
		}
	}

	editPrifileInfo(data) {
		return customFetch(`${this._baseUrl}/users/me `, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	editPrifileImg(data) {
		return customFetch(`${this._baseUrl}/users/me/avatar`, {
			headers: this._headers,

			method: 'PATCH',

			body: JSON.stringify(data),
		});
	}

	createCard({name, link}) {
		const data = {name, link};

		return customFetch(`${this._baseUrl}/cards`, {
			headers: this._headers,

			method: 'POST',

			body: JSON.stringify(data),
		});
	}
}

const api = new Api({
	baseUrl: 'https://around.nomoreparties.co/v1/group-12',

	headers: {
		authorization: '0ea43d66-a890-4252-aeb5-5f974b853c02',

		'Content-Type': 'application/json',
	},
});

export default api;
