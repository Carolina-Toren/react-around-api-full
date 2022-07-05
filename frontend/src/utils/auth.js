import api from './api';
export const BASE_URL = 'https://register.nomoreparties.co';

export function register({email, password}) {
	return api
		.customFetch(`${BASE_URL}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({email, password}),
		})
		.then((data) => {
			if (data) {
				console.log(data);
				return data;
			} else {
				throw new Error('User with this email address already exists');
			}
		});
}

export function authorize({email, password}) {
	return api
		.customFetch(`${BASE_URL}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({email, password}),
		})
		.then((data) => {
			if (data) {
				return localStorage.setItem('jwt', data.token);
			} else {
				throw new Error('the user with the specified email not found');
			}
		});
}

export function getContent(token) {
	return api.customFetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
}
