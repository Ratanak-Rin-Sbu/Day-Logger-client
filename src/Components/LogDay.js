function LogDay({ isLogDay }) {
	return (
		<div className="logday-wrapper">
			<div className='date-wrapper'>
        <button className='btn-prev-date'>{"<"}</button>
        <div className='displaying-date'>3/1/2021</div>
        <button className='btn-next-date'>{">"}</button>
      </div>
		</div>
	);
}

export default LogDay;
