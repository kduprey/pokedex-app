import React from "react";

const PokemonList = ({ pokemon }) => {
	return (
		<div>
			{pokemon.map((e) => (
				<div key={e}>{e}</div>
			))}
		</div>
	);
};

export default PokemonList;
