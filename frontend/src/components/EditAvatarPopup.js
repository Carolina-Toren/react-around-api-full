import React, {useState} from 'react';

import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
	const avatarLink = React.useRef();
	React.useEffect(() => {
		avatarLink.current.value = '';
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateAvatar({
			avatar: avatarLink.current.value,
		});
	}

	return (
		<PopupWithForm
			name='profile-img'
			title='Change profile picture'
			buttonTitle='Save'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type='url'
				className='popup__input'
				name='avatar'
				id='profileImg-input'
				placeholder='Image link'
				ref={avatarLink}
				required
			/>

			<span className='popup__error' id='title-input-error' />
		</PopupWithForm>
	);
}
