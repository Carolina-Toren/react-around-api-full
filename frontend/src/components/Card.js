import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

export default function Card({card, onCardClick, onCardLike, onDeleteClick}) {
	const handleClick = () => {
		onCardClick(card);
	};

	const handleLikeClick = () => {
		onCardLike(card);
	};

	const handleDeleteClick = () => {
		onDeleteClick(card);
	};

	const currentUser = React.useContext(CurrentUserContext);

	// Checking if the current user is the owner of the current card
	const isOwn = card.owner._id === currentUser._id;

	// Creating a variable which you'll then set in `className` for the delete button
	const cardDeleteButtonClassName = `photo-feed__delete-btn ${
		isOwn ? 'photo-feed__delete-btn_visible' : 'photo-feed__delete-btn_hidden'
	}`;

	const isLiked = card.likes.some((user) => user._id === currentUser._id);

	const cardLikeButtonClassName = `photo-feed__card-button ${
		isLiked ? 'photo-feed__card-button_active' : 'photo-feed__card-button_not-active'
	}`;

	return (
		<div className='photo-feed__card'>
			<button
				className={cardDeleteButtonClassName}
				onClick={handleDeleteClick}
				type='button'
				aria-label='delete button'
			/>

			<img className='photo-feed__image' onClick={handleClick} src={`${card.link}`} alt={`${card.name}`} />

			<div className='photo-feed__card-caption'>
				<h2 className='photo-feed__text'> {card.name}</h2>
				<div className='photo-feed__like-container'>
					<button
						className={cardLikeButtonClassName}
						onClick={handleLikeClick}
						type='button'
						aria-label='like button'
					/>
					<span className='photo-feed__card-button-counter'>{`${card.likes.length}`}</span>
				</div>
			</div>
		</div>
	);
}
