import React from 'react';

import PopupWithForm from './PopupWithForm.js';

export default function DeleteCardPopup({isOpen, onClose, onDeleteCardSubmit}) {
	function handleSubmit(e) {
		e.preventDefault();

		onDeleteCardSubmit();
	}

	return (
		<PopupWithForm
			name='delete'
			title='Are you sure?'
			buttonTitle='Yes'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		/>
	);
}
