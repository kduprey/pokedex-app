import React from "react";

const Pagination = ({ goToNextPage, goToPrevPage }) => {
	return (
		<div>
			{/* Checking if there is a method to even run for the buttons, 
			if none, then do not render the button */}
			{goToPrevPage && (
				<button onClick={goToPrevPage}>Previous</button>
			)}
			{goToNextPage && <button onClick={goToNextPage}>Next</button>}
		</div>
	);
};

export default Pagination;
