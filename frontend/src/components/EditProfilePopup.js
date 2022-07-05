import React from 'react';

import PopupWithForm from './PopupWithForm.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
	const [name, setName] = React.useState('');

	const [description, setDescription] = React.useState('');

	function handleNameChange(e) {
		setName(e.target.value);
	}

	function handleDescriptionChange(e) {
		setDescription(e.target.value);
	}

	const currentUser = React.useContext(CurrentUserContext);

	React.useEffect(() => {
		setName(currentUser.name);

		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateUser({
			name,

			about: description,
		});
	}

	return (
		<PopupWithForm
			name='edit'
			title='Edit profile'
			buttonTitle='Save'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type='text'
				className='popup__input'
				name='name'
				onChange={handleNameChange}
				value={name}
				id='name-input'
				maxLength='40'
				minLength='2'
				placeholder='Full Name'
				required
			/>

			<span className='popup__error' id='title-input-error' />

			<input
				type='text'
				className='popup__input'
				name='occupation'
				id='occupation-input'
				maxLength='200'
				minLength='2'
				placeholder='Occupation'
				value={description}
				onChange={handleDescriptionChange}
				required
			/>

			<span className='popup__error' id='img-link-input-error' />
		</PopupWithForm>
	);
}
