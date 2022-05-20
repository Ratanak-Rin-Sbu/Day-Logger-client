import { useState } from 'react';
import LogDay from './Components/LogDay';
import EditQuestions from './Components/EditQuestions';
import ViewData from './Components/ViewData';
import Profile from './Components/Profile';

function Home(profile, setProfile, setIsLogin) {
	const [isLogDayPage, setIsLogDayPage] = useState(true);
	const [isEditQuestionsPage, setIsEditQuestionsPage] = useState(false);
	const [isViewDataPage, setIsViewDataPage] = useState(false);
	const [isProfilePage, setIsProfilePage] = useState(false);

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
            alt='user-profile-pic'
						src={
							// profile?.profileImageUrl ||
							`${process.env.PUBLIC_URL}/assets/images/cat1.jpg`
						}
					/>
				</button>
			</div>

			{isLogDayPage && <LogDay />}
			{isEditQuestionsPage && <EditQuestions />}
			{isViewDataPage && <ViewData />}
			{isProfilePage && (
				<Profile setProfile={setProfile} setIsLogin={setIsLogin} />
			)}
		</>
	);
}

export default Home;
