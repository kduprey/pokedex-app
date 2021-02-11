import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

const App = () => {
	const [pokemon, setPokemon] = useState([]);
	const [currentPageUrl, setCurrentPageUrl] = useState(
		"https://pokeapi.co/api/v2/pokemon/"
	);
	const [nextPageUrl, setNextPageUrl] = useState();
	const [prevPageUrl, setPrevPageUrl] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Resets loading text, every time a request is called
		setLoading(true);

		let cancel;

		// Makes API call to retrieve data
		axios
			.get(currentPageUrl, {
				// Creating cancel token, which represents this specific request to be cancelled
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
			.then((res) => {
				// Remove's the loading text when the data is recieved
				setLoading(false);
				// Setting the next page URL
				setNextPageUrl(res.data.next);
				// Setting the previous page URL
				setPrevPageUrl(res.data.previous);
				// Setting the pokemon list with data
				setPokemon(res.data.results.map((p) => p.name));
			});

		// useEffect cleanup function running when the component gets disaccociated
		return () => {
			// cancelling the request via the cancel token
			cancel();
		};
		// Only rendering on first render, and when the currentPageUrk state changes
	}, [currentPageUrl]);

	const goToNextPage = () => {
		setCurrentPageUrl(nextPageUrl);
	};

	const goToPrevPage = () => {
		setCurrentPageUrl(prevPageUrl);
	};

	// Rendering loading text when loading is true
	if (loading) {
		return "Loading...";
	}
	// Rendering the Pokemon List
	return (
		<div>
			<PokemonList pokemon={pokemon} />
			{/* Checking if there is a url to go to the next page, 
			if there is none/null, 
			then do not provide a method for the pagination component to attach to the naviagtion buttons */}
			<Pagination
				goToNextPage={nextPageUrl ? goToNextPage : null}
				goToPrevPage={prevPageUrl ? goToPrevPage : null}
			/>
		</div>
	);
};

export default App;
