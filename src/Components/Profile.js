function Profile() {
	return (
		<form className="profile-form">
			<h1>Edit Profile</h1>
			<div className="profile-image">
				<label>
					<b>Profile Photo</b>s
				</label>
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

			<div className="profile-info">
				<label>
					<b>Name</b>
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
				<label>
					<b>Email</b>
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
				<label>
					<b>Address</b>
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
				<button
					className="button-logout"
					type="button"
					// onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</form>
	);
}

export default Profile;
