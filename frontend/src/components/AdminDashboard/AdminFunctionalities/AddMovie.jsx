import { useState } from "react";
import { useAdminMovieFunctions } from "../../../hooks/useAdminMovieFunctions";

export default function AddMovie() {
  const { addMovie } = useAdminMovieFunctions();
  const [addMovieData, setAddMovieData] = useState({
    title: "",
    plot: "",
    genres: [],
    directors: [],
    year: "",
    imdb: {
      rating: "",
      votes: "",
      id: "",
    },
  });

  const handleAddMovie = async (e, addMovieData) => {
    e.preventDefault();

    try {
      await addMovie(addMovieData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Title
          </label>
          <input
            onChange={(e) => {
              setAddMovieData({
                ...addMovieData,
                title: e.target.value,
              });
            }}
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="grid-first-name"
            type="text"
            placeholder="Its a new movie"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Plot
          </label>
          <input
            onChange={(e) => {
              setAddMovieData({
                ...addMovieData,
                plot: e.target.value,
              });
            }}
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="grid-last-name"
            type="text"
            placeholder="Its a new movie so we can't reveal it"
          />
        </div>
      </div>
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-city"
          >
            Genres
          </label>
          <input
            onChange={(e) => {
              setAddMovieData({
                ...addMovieData,
                genres: e.target.value.split(","),
              });
            }}
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="grid-city"
            type="text"
            placeholder="Action, Adventure, Comedy"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Directors
          </label>
          <input
            onChange={(e) => {
              setAddMovieData({
                ...addMovieData,
                directors: e.target.value.split(","),
              });
            }}
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="grid-state"
            type="text"
            placeholder="John Doe, Jane Doe"
          />
        </div>
      </div>
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-zip"
          >
            Year
          </label>
          <input
            onChange={(e) => {
              setAddMovieData({
                ...addMovieData,
                year: e.target.value,
              });
            }}
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="grid-zip"
            type="text"
            placeholder="2024"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-country"
          >
            IMDB Rating
          </label>
          <input
            onChange={(e) => {
              setAddMovieData({
                ...addMovieData,
                imdb: {
                  ...addMovieData.imdb,
                  rating: e.target.value,
                },
              });
            }}
            class="appearance
            -none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="grid-country"
            type="text"
            placeholder="4.7"
          />
        </div>
      </div>
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-zip"
          >
            IMDB Votes
          </label>
          <input
            onChange={(e) => {
              setAddMovieData({
                ...addMovieData,
                imdb: {
                  ...addMovieData.imdb,
                  votes: e.target.value,
                },
              });
            }}
            class="appearance
            -none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="grid-zip"
            type="text"
            placeholder="25"
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-country"
          >
            IMDB ID
          </label>
          <input
            onChange={(e) => {
              setAddMovieData({
                ...addMovieData,
                imdb: {
                  ...addMovieData.imdb,
                  id: e.target.value,
                },
              });
            }}
            class="appearance
            -none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="grid-country"
            type="text"
            placeholder="500"
          />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button
          onClick={(e) => handleAddMovie(e, addMovieData)}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Add Movie
        </button>
      </div>
    </div>
  );
}
