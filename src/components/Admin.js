import { useEffect } from 'react';
import { getQuestionsAPIMethod, getUsersAPIMethod } from '../api/client';

function Admin({ profile, setProfile }) {
	console.table(profile);

	useEffect(() => {
		getUsersAPIMethod().then((response) => {
			console.log(response);
		});
	}, []);

	return (
		<div className="admin-wrapper">
			<div className="unauthorized">
				<p>You do not have access to this page</p>
				<p>You must be logged in as an administrator</p>
			</div>
			<div className="user-info">
				map users here
				{/* FIXME map is not a function? profile is a funciton not an array? */}
				{/* {profile.map((prof) => (
					<div className="user-name" key={prof._id}>
						{prof.name}
					</div>
				))} */}
			</div>
		</div>
	);
}

export default Admin;
