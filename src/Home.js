import { useState, useEffect } from 'react';
import LogDay from './components/LogDay';
import EditQuestions from './components/EditQuestions';
import ViewData from './components/ViewData';
import Admin from './components/Admin';
import Profile from './components/Profile';
import {
	createQuestionAPIMethod,
	getQuestionsAPIMethod,
	updateUserAPIMethod,
} from './api/client';

function Home({ profile, setProfile, setIsLogin }) {
	console.log('🚀 ~ file: Home.js ~ line 14 ~ Home ~ profile', profile);
	const [isLogDayPage, setIsLogDayPage] = useState(true);
	const [isEditQuestionsPage, setIsEditQuestionsPage] = useState(false);
	const [isViewDataPage, setIsViewDataPage] = useState(false);
	const [isProfilePage, setIsProfilePage] = useState(false);
	const [isAdminPage, setIsAdminPage] = useState(false);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		getQuestionsAPIMethod().then((questions) => {
			setQuestions(questions);
		});
	}, []);

	const addQuestion = async () => {
		const data = {
			text: '',
			type: 'number',
			date: new Date().toLocaleString('en-US', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
			}),
			choices: ['', '', ''],
		};
		createQuestionAPIMethod(data).then((response) => {
			console.log('Question created');
		});
		setQuestions([data, ...questions]);
		console.log(data._id);
	};

	const deleteQuestion = async (idToDelete) => {
		const data = await fetch('/api/questions/' + idToDelete, {
			method: 'DELETE',
		}).then((res) => res.json());
		setQuestions(questions.filter((question) => question._id !== idToDelete));
	};

	const handleProfileName = (text) => {
		const newProfile = {
			...profile,
			name: text,
		};
		setProfile(newProfile);
	};

	const handleProfileEmail = (text) => {
		const newProfile = {
			...profile,
			email: text,
		};
		setProfile(newProfile);
	};

	const handleProfileAddress1 = (text) => {
		const newProfile = {
			...profile,
			address1: text,
		};
		setProfile(newProfile);
	};

	const handleProfileAddress2 = (text) => {
		const newProfile = {
			...profile,
			address2: text,
		};
		setProfile(newProfile);
	};

	const handleSaveClick = async (e) => {
		e.preventDefault();
		console.log(profile);

		await updateUserAPIMethod(profile);
		// closeProfileModal();
	};

	const openLogDay = () => {
		setIsLogDayPage(true);
		setIsEditQuestionsPage(false);
		setIsViewDataPage(false);
		setIsProfilePage(false);
		setIsAdminPage(false);
	};

	const openEditQuestions = () => {
		setIsLogDayPage(false);
		setIsEditQuestionsPage(true);
		setIsViewDataPage(false);
		setIsProfilePage(false);
		setIsAdminPage(false);
	};

	const openViewData = () => {
		setIsLogDayPage(false);
		setIsEditQuestionsPage(false);
		setIsViewDataPage(true);
		setIsProfilePage(false);
		setIsAdminPage(false);
	};

	const openProfile = () => {
		setIsLogDayPage(false);
		setIsEditQuestionsPage(false);
		setIsViewDataPage(false);
		setIsProfilePage(true);
		setIsAdminPage(false);
	};

	const openAdmin = () => {
		setIsLogDayPage(false);
		setIsEditQuestionsPage(false);
		setIsViewDataPage(false);
		setIsProfilePage(false);
		setIsAdminPage(true);
	};

	return (
		<>
			<div className="header">
				<h1 id="main-title">Day Logger</h1>
				<div className="navigation">
					<label
						className={`btn-home ${isLogDayPage ? 'active' : ''}`}
						id="btn-open-log-day"
						onClick={openLogDay}
					>
						Log Day
					</label>

					<label
						className={`btn-home ${isEditQuestionsPage ? 'active' : ''}`}
						id="btn-open-edit-questions"
						onClick={openEditQuestions}
					>
						Edit Questions
					</label>

					<label
						className={`btn-home ${isViewDataPage ? 'active' : ''}`}
						id="btn-open-view-data"
						onClick={openViewData}
					>
						View Data
					</label>
					<label
						className={`btn-home ${isAdminPage ? 'active' : ''}`}
						id="btn-open-edit-questions"
						onClick={openAdmin}
					>
						Admin
					</label>
				</div>
				<button
					className="image-profile"
					id="button-profile"
					type="button"
					onClick={openProfile}
					// onClick={openModal}
				>
					<img
						className="image-profile"
						alt="user-profile-pic"
						src={
							profile?.profileImageUrl ||
							`${process.env.PUBLIC_URL}/assets/images/cat1.jpg`
						}
					/>
				</button>
			</div>

			{isLogDayPage && (
				<LogDay questions={questions} setQuestions={setQuestions} />
			)}
			{isEditQuestionsPage && (
				<EditQuestions
					questions={questions}
					setQuestions={setQuestions}
					addQuestion={addQuestion}
					deleteQuestion={deleteQuestion}
				/>
			)}
			{isViewDataPage && <ViewData />}
			{profile.isAdmin === true
				? isAdminPage && <Admin profile={profile} setProfile={setProfile} />
				: null}
			{isProfilePage && (
				<Profile
					profile={profile}
					setProfile={setProfile}
					setIsLogin={setIsLogin}
					handleProfileName={handleProfileName}
					handleProfileEmail={handleProfileEmail}
					handleProfileAddress1={handleProfileAddress1}
					handleProfileAddress2={handleProfileAddress2}
					handleSaveClick={handleSaveClick}
				/>
			)}
		</>
	);
}

export default Home;
