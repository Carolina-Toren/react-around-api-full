import fail from '../images/FailStatus.svg';
import success from '../images/SuccessStatus.svg';

let text;

export default function InfoTooltip(props) {
	function handleSuccessfulRegistration() {}
	return (
		<div className={`popup popup_${props.name} ${props.isOpen ? 'popup_visible' : ''} `}>
			<div className='popup__window'>
				<button className='popup__close-btn' id='close_btn_registration' type='button' onClick={props.onClose} />
				<img className='popup__registration-status' src={props.status === false ? fail : success} />
				<span className='popup__registration-text'>
					{props.status === false
						? 'Oops, something went wrong! Please try again.'
						: 'Success! You have now been registered.'}
				</span>
			</div>
		</div>
	);
}
