export default function PopupWithForm(props) {
	const {name, title, buttonTitle, isOpen, onClose, onSubmit} = props;
	return (
		<div className={`popup popup_${name} ${isOpen ? 'popup_visible' : ''} `}>
			<div className='popup__window'>
				<button
					className='popup__close-btn'
					onClick={onClose}
					type='button'
					aria-label='Close button'
					id='close_btn_edit'
				/>

				<h2 className='popup__window-title'> {title} </h2>

				<form className={`popup__form popup__form_${name}`} name={`popup__form_${name}`} onSubmit={onSubmit}>
					{props.children}
					<button type='submit' className='popup__save-button' id={`${name}-save-btn`}>
						{buttonTitle}
					</button>
				</form>
			</div>
		</div>
	);
}
