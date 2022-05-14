import LogDay from './Components/LogDay';
import EditQuestions from './Components/EditQuestions';
import { useState } from 'react';

function App() {
	const [isLogDay, setIsLogDay] = useState(false);
	const [isEditQeustions, setIsEditQuestions] = useState(false);

	const openLogDay = () => {
		setIsLogDay(true);
		setIsEditQuestions(false);
	};

	const openEditQuestions = () => {
		setIsLogDay(false);
		setIsEditQuestions(true);
	};

	return (
		<>
			<button className="btn-Home" id="btn-open-log-day" onClick={openLogDay}>
				Log Day
			</button>

			<button
				className="btn-Home"
				id="btn-open-edit-questions"
				onClick={openEditQuestions}
			>
				Edit Questions
			</button>

			{isLogDay && <LogDay />}
			{isEditQeustions && <EditQuestions />}
		</>
	);
}

export default App;
