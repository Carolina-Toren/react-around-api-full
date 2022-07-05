import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onAddPlaceSubmit}) {
	const [place, setPlace] = React.useState('');
	const [link, setLink] = React.useState('');

	React.useEffect(() => {
		setPlace('');
		setLink('');
	}, [isOpen]);

	function handlePlaceChange(e) {
		setPlace(e.target.value);
	}

	function handleLinkChange(e) {
		setLink(e.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		onAddPlaceSubmit({
			name: place,
			link: link,
		});
	}
	return (
		<PopupWithForm
			name='add'
			title='New Place'
			buttonTitle='Create'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type='text'
				className='popup__input'
				name='title'
				id='title-input'
				maxLength='30'
				minLength='1'
				value={place}
				onChange={handlePlaceChange}
				placeholder='Title'
				required
			/>
			<span className='popup__error' id='title-input-error' />
			<input
				type='url'
				className='popup__input'
				name='imglink'
				id='img-link-input'
				value={link}
				onChange={handleLinkChange}
				placeholder='Image link'
				required
			/>
			<span className='popup__error' id='img-link-input-error' />
		</PopupWithForm>
	);
}
