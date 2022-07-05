import React, {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api.js';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import * as auth from '../utils/auth.js';

function App() {
	const [currentUser, setCurenUser] = useState({name: '', about: '', avatar: '', _id: ''});

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		api
			.getUserInfo()
			.then((res) => {
				setCurenUser({name: res.name, about: res.about, avatar: res.avatar, _id: res._id});
			})
			.catch(console.log);
	}, []);

	const [cards, setCards] = useState([]);
	const [selectedCard, setSelectedCard] = useState({
		name: '',
		link: '',
	});

	const [deleteCard, setDeletedCard] = useState({
		_id: '',
	});
	React.useEffect(() => {
		api
			.getInitialCards()
			.then((res) => {
				setCards(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const navigate = useNavigate();
	const [values, setValues] = useState({
		email: '',
		password: '',
	});
	function handleChange(evt) {
		const {type, value} = evt.target;
		setValues({...values, [type]: value});
	}
	function handleLogoutClick() {
		localStorage.removeItem('jwt');
		setIsLoggedIn(false);
	}

	function handleRegitrationSubmit(values) {
		auth
			.register(values)
			.then(() => {
				navigate('./login');
				setIsRegistrationSucceeded(true);
			})
			.catch((err) => {
				console.log(err);
				setIsRegistrationSucceeded(false);
			})
			.finally(() => {
				setIsInfoTooltipOpen(true);
			});
	}

	function checkToken() {
		if (localStorage.getItem('jwt')) {
			const jwt = localStorage.getItem('jwt');
			auth
				.getContent(jwt)
				.then((res) => {
					setIsLoggedIn(true);
					setValues({
						email: `${res.data.email}`,
					});
					navigate('/');
				})
				.catch(console.log);
		}
	}

	React.useEffect(() => {
		checkToken();
	}, []);

	function handleLogin(values) {
		auth
			.authorize(values)
			.then(checkToken)
			.catch((err) => {
				console.log(err);
				setIsInfoTooltipOpen(true);
			});
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((user) => user._id === currentUser._id);
		api
			.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((state) => state.map((item) => (item._id === card._id ? newCard : item)));
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleDeleteClick() {
		api
			.deleteCard(deleteCard._id)
			.then(() => {
				const newCards = cards.filter((item) => item._id !== deleteCard._id);
				setCards(newCards);
				setIsDeleteCardPopupOpen(false);
			})
			.catch(console.log);
	}

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, seIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
	const [isRegistrationSucceeded, setIsRegistrationSucceeded] = useState(false);
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

	function handleCardClick(card) {
		setSelectedCard({name: card.name, link: card.link});
	}
	function handleDeleteCardClick(card) {
		setIsDeleteCardPopupOpen(true);
		setDeletedCard({_id: card._id});
	}
	function handleEditAvatarClick() {
		seIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setIsAddPlacePopupOpen(false);
		setIsEditProfilePopupOpen(false);
		seIsEditAvatarPopupOpen(false);
		setIsImagePopupOpen(false);
		setIsDeleteCardPopupOpen(false);
		setIsInfoTooltipOpen(false);
		setSelectedCard({name: '', link: ''});
	}

	function handleUpdateUser(data) {
		api
			.editPrifileInfo(data)
			.then((res) => {
				setCurenUser({
					name: res.name,
					about: res.about,
					avatar: res.avatar,
					_id: res._id,
				});
				setIsEditProfilePopupOpen(false);
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
			});
	}

	function handleUpdateAvatar(data) {
		api
			.editPrifileImg(data)
			.then((res) => {
				setCurenUser({
					name: res.name,
					about: res.about,
					avatar: res.avatar,
					_id: res._id,
				});
				seIsEditAvatarPopupOpen(false);
			})

			.catch((err) => {
				console.log(`Error: ${err}`);
			});
	}

	function handleAddPlaceSubmit(data) {
		api
			.createCard(data)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				setIsAddPlacePopupOpen(false);
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
			});
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='page__container'>
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRoute
								element={
									<>
										<Header isLoggedIn={isLoggedIn} user={values} onClick={handleLogoutClick} authName={'Log out'} />
										<Main
											onEditProfileClick={handleEditProfileClick}
											onAddPlaceClick={handleAddPlaceClick}
											onEditAvatarClick={handleEditAvatarClick}
											onCardClick={handleCardClick}
											isOpenImage={isImagePopupOpen}
											onDeleteClick={handleDeleteCardClick}
											cards={cards}
											onCardLike={handleCardLike}
										/>
										<Footer />
									</>
								}
								isLoggedIn={isLoggedIn}
							/>
						}
					/>
					<Route
						path='/register'
						element={
							<>
								<Header
									isLoggedIn={isLoggedIn}
									user={values}
									onClick={() => {
										navigate('/login');
									}}
									authName={'Log in'}
								/>
								<Register onSubmit={handleRegitrationSubmit} onChange={handleChange} />
							</>
						}
					></Route>
					<Route
						path='/login'
						element={
							<>
								<Header
									isLoggedIn={isLoggedIn}
									user={values}
									onClick={() => {
										navigate('/register');
									}}
									authName={'Sign up'}
								/>
								<Login onLoginClick={handleLogin} />
							</>
						}
					></Route>
				</Routes>
				<EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
				<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
				<AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />
				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
				<DeleteCardPopup
					isOpen={isDeleteCardPopupOpen}
					onClose={closeAllPopups}
					onDeleteCardSubmit={handleDeleteClick}
				/>
				<InfoTooltip
					name={'registration'}
					onClose={closeAllPopups}
					status={isRegistrationSucceeded}
					isOpen={isInfoTooltipOpen}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
