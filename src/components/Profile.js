import {
	logoutUserAPIMethod,
	updateUserAPIMethod,
	uploadImageToCloudinaryAPIMethod,
} from '../api/client';

function Profile({ profile, setProfile, setIsLogin }) {
	const handleLogout = async (e) => {
		e.preventDefault();
		console.log('user logged out');
		await logoutUserAPIMethod({
			profile,
		});

		setProfile(null);
		setIsLogin(true);
	};

	return (
		<form className="profile-form">
			<h1>Edit Profile</h1>
			<div className="profile profile-image">
				<label>
					<h2 className="main-title">Profile Photo</h2>
				</label>
				<div className="profile-picture-header">
					<div className="img">
						<img
							className="image-profile"
							alt="user-profile"
							src={
								// profile?.profileImageUrl ||
								`${process.env.PUBLIC_URL}/assets/images/cat1.jpg`
							}
						/>
					</div>

					<div className="input-image">
						<input
							type="file"
							name="image"
							accept="image/*"
							id="cloudinary"
							// onChange={handleImageSelected}
							style={{ display: 'none' }}
						/>
						<button
							// ref={imageUploadButtonRef}
							id="btn-add-image"
							// onClick={handleClickImageInput}
						>
							Choose new image
						</button>
					</div>
					<button
						id="btn-remove-image"
						// onClick={handleRemoveImage}
					>
						Remove image
					</button>
				</div>
			</div>

			<div className="profile profile-name">
				<label>
					<h2 className="main-title">Name</h2>
				</label>
				<input
					className="input-name"
					type="text"
					placeholder="Seungjun Chae"
					// defaultValue={profile.name}
					// onChange={(e) => {
					// 	handleProfileName(e.target.value);
					// }}
				/>
			</div>

			<div className="profile profile-email">
				<label>
					<h2 className="main-title">Email</h2>
				</label>
				<input
					className="input-email"
					type="text"
					placeholder="seungjun.chae@stonybrook.edu"
					// defaultValue={profile.email}
					// onChange={(e) => {
					// 	handleProfileEmail(e.target.value);
					// }}
				/>
			</div>

			<div className="profile profile-address">
				<label>
					<h2 className="main-title">Address</h2>
				</label>
				<input
					className="input-address"
					type="text"
					placeholder="119 songdo moonwha-ro"
					// defaultValue={profile.name}
					// onChange={(e) => {
					// 	handleProfileName(e.target.value);
					// }}
				/>
				<input
					className="input-address"
					type="text"
					placeholder="Incheon, Yeonsu-gu, Korea"
					// defaultValue={profile.name}
					// onChange={(e) => {
					// 	handleProfileName(e.target.value);
					// }}
				/>
			</div>

			<div className="profile-bottom">
				<input
					className="input-save"
					type="submit"
					value="Save"
					// ref={saveButtonRef}
					// onClick={handleSaveClick}
				/>
				{/* <button className="button-save" onClick={handleSaveClick}>Save</button> */}
				<button className="button-logout" onClick={handleLogout}>
					Logout
				</button>
			</div>
		</form>
	);
}

export default Profile;
