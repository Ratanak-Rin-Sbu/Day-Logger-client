import Questions from './Questions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function EditQuestions() {
	return (
		<div className="edit-questions">
			<div className="sect1">
				<h2 className="main-title">Edit Questions</h2>
				<div>
					<AddCircleOutlineIcon className="materialIcons" />
				</div>
			</div>
			<div className="sect2">
				<Questions />
				<Questions />
				<Questions />
				<Questions />
			</div>
			<input
					className="save-questions"
					type="submit"
					value="Save"
			/>
		</div>
	);
}

export default EditQuestions;
