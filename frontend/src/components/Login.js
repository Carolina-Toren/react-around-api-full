import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login({onLoginClick}) {
	const [values, setValues] = useState({});

	function handleChange(evt) {
		const {type, value} = evt.target;
		setValues({...values, [type]: value});
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		onLoginClick(values);
	}

	const navigate = useNavigate();
	return (
		<div className='login'>
			<form className='login__form' onSubmit={handleSubmit}>
				<h1 className='login__header'>Log in</h1>
				<input
					className='login__input'
					type='email'
					autoComplete='email'
					placeholder='Email'
					onChange={handleChange}
					value={values.email || ''}
				/>
				<input
					className='login__input'
					type='password'
					autoComplete='current-password'
					placeholder='Password'
					onChange={handleChange}
					value={values.password || ''}
				/>
				<button className='login__btn' type='submit' id='login-btn'>
					Log in
				</button>
				<a className='login__link' onClick={() => navigate('/register')}>
					Not a member yet? Sign up here!
				</a>
			</form>
		</div>
	);
}
