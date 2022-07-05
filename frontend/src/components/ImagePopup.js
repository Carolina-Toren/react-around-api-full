export default function ImagePopup({card, onClose}) {
	return (
		<div className={`popup popup_photo ${card.name ? 'popup_visible' : ''} `}>
			<div className='popup__image-container'>
				<button className='popup__close-btn' onClick={onClose} id='close_btn_photo' />

				<figure className='popup__figure-container'>
					<img className='popup__image' src={card.link} alt={card.name} />

					<figcaption className='popup__image-caption'>{card.name}</figcaption>
				</figure>
			</div>
		</div>
	);
}
