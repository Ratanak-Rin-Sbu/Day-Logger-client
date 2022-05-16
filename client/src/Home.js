import { useState } from 'react';
import LogDay from './Components/LogDay';
import EditQuestions from './Components/EditQuestions';
import ViewData from './Components/ViewData';

function Home(profile, setProfile, setIsLogin) {
	const [isLogDay, setIsLogDay] = useState(true);
	const [isEditQuestions, setIsEditQuestions] = useState(false);
	const [isViewData, setIsViewData] = useState(false);

	const openLogDay = () => {
		setIsLogDay(true);
		setIsEditQuestions(false);
		setIsViewData(false);
	};

	const openEditQuestions = () => {
		setIsLogDay(false);
		setIsEditQuestions(true);
		setIsViewData(false);
	};

	const openViewData = () => {
		setIsLogDay(false);
		setIsEditQuestions(false);
		setIsViewData(true);
	};

	return (
		<>
			<div className="header">
				<h1 id="main-title">Day Logger</h1>
				<div className="navigation">
					<label className={`btn-home ${isLogDay ? "active": ""}`} id="btn-open-log-day" onClick={openLogDay}>
						Log Day
					</label>

					<label
						className={`btn-home ${isEditQuestions ? "active": ""}`}
						id="btn-open-edit-questions"
						onClick={openEditQuestions}
					>
						Edit Questions
					</label>

					<label
						className={`btn-home ${isViewData ? "active": ""}`}
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
						// onClick={openModal}
					>
						<img
							className="image-profile"
							src={
								// profile?.profileImageUrl ||
								`${process.env.PUBLIC_URL}/assets/images/cat1.jpg`
							}
						/>
					</button>
			</div>

			{isLogDay && <LogDay />}
			{isEditQuestions && <EditQuestions />}
			{isViewData && <ViewData />}
		</>
	);
}
export default Home;
