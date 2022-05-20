import React from 'react';
import { useState } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Questions = () => {
	const [question, setQuestion] = useState();

	if (question === 'multiple-choice') {
		return (
			<div className="questions">
				<textarea className="input-question"></textarea>
				<div className="edit-questions-header">
					<select
						className="question-types"
						defaultValue="multiple choice"
						onChange={(e) => setQuestion(e.target.value)}
					>
						<option value="number">number</option>
						<option value="boolean">boolean</option>
						<option value="text">text</option>
						<option value="multiple-choice">multiple choice</option>
					</select>
					<DeleteOutlineIcon />
				</div>
				<div className="choice">
					{/* <CircleOutlinedIcon color="disabled" fontSize="small" /> */}
					<input type="radio"></input>
					<textarea className="input-choice"></textarea>
				</div>
				<div className="choice">
					{/* <CircleOutlinedIcon color="disabled" fontSize="small" /> */}
					<input type="radio"></input>
					<textarea className="input-choice"></textarea>
				</div>
				<div className="choice">
					{/* <CircleOutlinedIcon color="disabled" fontSize="small" /> */}
					<input type="radio"></input>
					<textarea className="input-choice"></textarea>
				</div>
			</div>
		);
	}
	return (
		<div className="questions">
			<textarea className="input-question"></textarea>
			<div className="edit-questions-header">
				<select
					className="question-types"
					onChange={(e) => setQuestion(e.target.value)}
				>
					<option value="number">number</option>
					<option value="boolean">boolean</option>
					<option value="text">text</option>
					<option value="multiple-choice">multiple choice</option>
				</select>
				<DeleteOutlineIcon />
			</div>
		</div>
	);
};

export default Questions;
