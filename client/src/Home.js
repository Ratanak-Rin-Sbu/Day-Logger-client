import { useState } from 'react';
import LogDay from './Components/LogDay';
import EditQuestions from './Components/EditQuestions';
import ViewData from './Components/ViewData';

function Home(profile, setProfile, setIsLogin) {
	const [isLogDay, setIsLogDay] = useState(false);
	const [isEditQeustions, setIsEditQuestions] = useState(false);
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
			<h1 id="main-title">Day Logger</h1>
			<div>
				<label className="btn-Home" id="btn-open-log-day" onClick={openLogDay}>
					Log Day
				</label>

				<label
					className="btn-Home"
					id="btn-open-edit-questions"
					onClick={openEditQuestions}
				>
					Edit Questions
				</label>
				<label
					className="btn-Home"
					id="btn-open-view-data"
					onClick={openViewData}
				>
					View Data
				</label>
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
			{isEditQeustions && <EditQuestions />}
			{isViewData && <ViewData />}
		</>
	);
}
export default Home;
