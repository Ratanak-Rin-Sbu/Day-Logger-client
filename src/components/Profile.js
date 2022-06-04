import {
	logoutUserAPIMethod,
	uploadImageToCloudinaryAPIMethod,
} from '../api/client';

function Profile({
	profile,
	setProfile,
	setIsLogin,
	handleProfileName,
	handleProfileEmail,
	handleProfileAddress1,
	handleProfileAddress2,
	handleSaveClick,
}) {
	const handleLogout = async (e) => {
		e.preventDefault();
		console.log('user logged out');
		await logoutUserAPIMethod({
			profile,
		});

		setProfile(null);
		setIsLogin(true);
	};

	const handleImageSelected1 = async (event) => {
		event.preventDefault();
		console.log('New File Selected');
		if (event.target.files && event.target.files[0]) {
			// TODO Perform basic image validation
			// to ensure the newly selected image is a common image type
			// before uploading the image to Cloudinary

			// Could also do additional error checking on the file type, if we wanted
			// to only allow certain types of files.
			const selectedFile = event.target.files[0];
			console.dir(selectedFile);

			const formData = new FormData();
			const unsignedUploadPreset = 'wbsf92da';
			formData.append('file', selectedFile);
			formData.append('upload_preset', unsignedUploadPreset);

			console.log('Cloudinary upload');
			const imageResponse = await uploadImageToCloudinaryAPIMethod(formData);
			console.log('Upload success');
			console.dir(imageResponse);

			// Now the URL gets saved to the author
			const updatedUser = { ...profile, profileImageUrl: imageResponse.url };
			setProfile(updatedUser);

			// Now we want to make sure this is updated on the server – either the
			// user needs to click the submit button, or we could trigger the server call here
			const cloudInput = document.getElementById('cloudinary1');
			// console.log('Uploaded cloud', cloudInput.value);
			cloudInput.value = null;
			// console.log('Uploaded cloud after clean', cloudInput.value);
		}
	};
	const handleImageSelected2 = async (event) => {
		event.preventDefault();
		console.log('New File Selected');
		if (event.target.files && event.target.files[0]) {
			// TODO Perform basic image validation
			// to ensure the newly selected image is a common image type
			// before uploading the image to Cloudinary

			// Could also do additional error checking on the file type, if we wanted
			// to only allow certain types of files.
			const selectedFile = event.target.files[0];
			console.dir(selectedFile);

			const formData = new FormData();
			const unsignedUploadPreset = 'wbsf92da';
			formData.append('file', selectedFile);
			formData.append('upload_preset', unsignedUploadPreset);

			console.log('Cloudinary upload');
			const imageResponse = await uploadImageToCloudinaryAPIMethod(formData);
			console.log('Upload success');
			console.dir(imageResponse);

			// Now the URL gets saved to the author
			const updatedUser = { ...profile, profileImageUrl: imageResponse.url };
			setProfile(updatedUser);

			// Now we want to make sure this is updated on the server – either the
			// user needs to click the submit button, or we could trigger the server call here
			const cloudInput = document.getElementById('cloudinary2');
			// console.log('Uploaded cloud', cloudInput.value);
			cloudInput.value = null;
			// console.log('Uploaded cloud after clean', cloudInput.value);
		}
	};

	const handleClickImageInput1 = (e) => {
		e.preventDefault();
		document.getElementById('cloudinary1').click();
	};

	const handleClickImageInput2 = (e) => {
		e.preventDefault();
		document.getElementById('cloudinary2').click();
	};

	const handleRemoveImage = (e) => {
		e.preventDefault();
		const updatedUser = { ...profile, profileImageUrl: '' };
		setProfile(updatedUser);
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
						<input
							type="file"
							name="image"
							accept="image/*"
							id="cloudinary1"
							onChange={handleImageSelected1}
							style={{ display: 'none' }}
						/>
						<button id="btn-choose-image" onClick={handleClickImageInput1}>
							<img
								className="image-profile"
								alt="user-profile"
								src={
									profile?.profileImageUrl ||
									`${process.env.PUBLIC_URL}/assets/images/cat1.jpg`
								}
							/>
						</button>
					</div>

					<div className="input-image">
						<input
							type="file"
							name="image"
							accept="image/*"
							id="cloudinary2"
							onChange={handleImageSelected2}
							style={{ display: 'none' }}
						/>
						<button
							// ref={imageUploadButtonRef}
							id="btn-add-image"
							onClick={handleClickImageInput2}
						>
							Choose new image
						</button>
					</div>
					<button id="btn-remove-image" onClick={handleRemoveImage}>
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
					defaultValue={profile.name}
					onChange={(e) => {
						handleProfileName(e.target.value);
					}}
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
					defaultValue={profile.email}
					onChange={(e) => {
						handleProfileEmail(e.target.value);
					}}
				/>
			</div>

			<div className="profile profile-address">
				<label>
					<h2 className="main-title">Address</h2>
				</label>
				<input
					className="input-address"
					id="input-address2"
					type="text"
					placeholder="119 songdo moonwha-ro"
					defaultValue={profile.name}
					onChange={(e) => {
						handleProfileAddress1(e.target.value);
					}}
				/>
				<input
					className="input-address"
					id="input-address2"
					type="text"
					placeholder="Incheon, Yeonsu-gu, Korea"
					defaultValue={profile.name}
					onChange={(e) => {
						handleProfileAddress2(e.target.value);
					}}
				/>
			</div>

			<div className="profile-bottom">
				<input
					className="input-save"
					type="submit"
					value="Save"
					// ref={saveButtonRef}
					onClick={handleSaveClick}
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
