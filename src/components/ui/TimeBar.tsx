function TimeBar() {
	const timeSpaces = ["G", "S", "M", "A"];
	return (
		<div className="object-top w-full bg-white shadow-xl rounded-2xl m-4">
			<div className="flex  justify-around">
				{timeSpaces.map((time, index) => (
					<button
						key={index}
						className="flex-1/4 p-3 font-extralight hover:bg-blue-300 rounded-2xl transition-all ease-in-out"
					>
						{time}
					</button>
				))}
			</div>
		</div>
	);
}

export default TimeBar;
