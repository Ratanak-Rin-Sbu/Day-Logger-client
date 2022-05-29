import { useState, useEffect } from 'react';
import LogDay from './components/LogDay';
import EditQuestions from './components/EditQuestions';
import ViewData from './components/ViewData';
import Profile from './components/Profile';

import { getQuestionsAPIMethod } from './api/client';

import {
	createQuestionAPIMethod,
	updateQuestionsAPIMethod,
} from './api/client';

function Home(profile, setProfile, setIsLogin) {
	const [isLogDayPage, setIsLogDayPage] = useState(true);
	const [isEditQuestionsPage, setIsEditQuestionsPage] = useState(false);
	const [isViewDataPage, setIsViewDataPage] = useState(false);
	const [isProfilePage, setIsProfilePage] = useState(false);
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
			responses: [],
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

	const openLogDay = () => {
		setIsLogDayPage(true);
		setIsEditQuestionsPage(false);
		setIsViewDataPage(false);
		setIsProfilePage(false);
	};

	const openEditQuestions = () => {
		setIsLogDayPage(false);
		setIsEditQuestionsPage(true);
		setIsViewDataPage(false);
		setIsProfilePage(false);
	};

	const openViewData = () => {
		setIsLogDayPage(false);
		setIsEditQuestionsPage(false);
		setIsViewDataPage(true);
		setIsProfilePage(false);
	};

	const openProfile = () => {
		setIsLogDayPage(false);
		setIsEditQuestionsPage(false);
		setIsViewDataPage(false);
		setIsProfilePage(true);
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
							// profile?.profileImageUrl ||
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
			{isProfilePage && (
				<Profile
					profile={profile}
					setProfile={setProfile}
					setIsLogin={setIsLogin}
				/>
			)}
		</>
	);
}

export default Home;
