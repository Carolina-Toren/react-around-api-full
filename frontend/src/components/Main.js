import PopupWithForm from './PopupWithForm.js';
import React, {useState, useEffect} from 'react';
import {api} from '../utils/api';
import Card from './Card';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main({
	onEditProfileClick,
	onAddPlaceClick,
	onEditAvatarClick,
	onDeleteClick,
	onCardClick,
	isOpenImage,
	cards,
	onCardLike,
}) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className='content'>
			<section className='profile'>
				<div
					className='profile__image'
					style={{
						backgroundImage: `url("${currentUser.avatar}")`,
					}}
				>
					<button className='profile__img-button' onClick={onEditAvatarClick} />
				</div>
				<div className='profile__info'>
					<div className='profile__info-title'>
						<h1 className='profile__name'>{currentUser.name}</h1>
						<button
							className='profile__edit-button'
							onClick={onEditProfileClick}
							type='button'
							aria-label='Edit profile user information button'
						/>
					</div>
					<p className='profile__occupation'>{currentUser.about}</p>
				</div>
				<button
					className='profile__add-button'
					onClick={onAddPlaceClick}
					type='button'
					aria-label='Add photo button'
					id='add_btn'
				/>
			</section>
			{/* <!--END OF PROFILE SECTION--> */}
			<section className='photo-feed'>
				<div className='photo-feed__grid'>
					{cards.map((card) => (
						<Card
							key={card._id}
							card={card}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onDeleteClick={onDeleteClick}
						/>
					))}
				</div>
			</section>
			{/* <!--END OF PHOTO FEED SECTION--> */}
		</main>
	);
}
