import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Register(props) {
	const onChange = props.onChange;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	function handleEmailInput(evt) {
		setEmail(evt.target.value);
		onChange(evt);
	}
	function handlePasswordInput(evt) {
		setPassword(evt.target.value);
		onChange(evt);
	}
	function handleSubmit(evt) {
		evt.preventDefault();
		props.onSubmit({email, password});
	}

	return (
		<div className='login'>
			<form className='login__form' onSubmit={handleSubmit}>
				<h1 className='login__header'>Sign up</h1>
				<input
					className='login__input'
					type='email'
					autoComplete='email'
					placeholder='Email'
					onChange={handleEmailInput}
					value={email || ''}
				></input>
				<input
					className='login__input'
					type='password'
					autoComplete='new-password'
					placeholder='Password'
					onChange={handlePasswordInput}
					value={password || ''}
				></input>
				<button className='login__btn' type='submit' id='register-signup-btn'>
					Sign up
				</button>
				<a className='login__link' onClick={() => navigate('/login')}>
					Already a member? Log in here!
				</a>
			</form>
		</div>
	);
}
