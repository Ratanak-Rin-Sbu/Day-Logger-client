function Profile() {
  return (
    <form className="profile-form">
			<div className="profile-nav">
				<h1>Edit Profile</h1>
				<button
					className="button-close"
					id="button-close"
					// onClick={handleClose}
					// ref={closeButtonRef}
				>
					X
				</button>
			</div>

			<div className="profile-image">
				<div className="img">
					<img
						className="profile-picture"
            id="profile-profile"
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
						Add Image
					</button>
				</div>
        <button id="btn-remove-image"
          // onClick={handleRemoveImage}
        >
					Remove Image
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
					<b>Adress</b>
				</label>
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
        <button className="button-logout" type="button"
          // onClick={handleLogout}
        >
					Logout
				</button>
			</div>
		</form>
  )
}

export default Profile;