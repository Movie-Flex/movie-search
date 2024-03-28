import { useState } from "react";
import { useAdminMovieFunctions } from "../../../hooks/useAdminMovieFunctions";
import toast from "react-hot-toast";

const addMovieData ={


  
  "released": {
    "$date": {
      "$numberLong": "-1578268800000"
    }
  },
  
  
  "lastupdated": "2015-04-17 00:16:14.220000000",
  
  "type": "movie",
  "tomatoes": {
    "viewer": {
      "rating": 3.3,
      "numReviews": 71,
      "meter": 55
    },
    "production": "Pathè Exchange",
    "lastUpdated": {
      "$date": "2015-08-21T18:45:11.000Z"
    }
  },
  "num_mflix_comments": 0,
}

export default function AddMovie() {
  const { addMovie } = useAdminMovieFunctions();
  const [addMovieData, setAddMovieData] = useState({
    //make all the fields
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

    runtime: "",
    rated: "",
    cast: [],
    poster: "",
    fullplot: "",
    languages: [],
    released: "",
    writers: [],
    awards: {
      wins: "",
      nominations: "",
      text: "",
    },
    lastupdated: "",
    countries: [],
    type: "",
    tomatoes: {
      viewer: {
        rating: "",
        numReviews: "",
        meter: "",
      },
      production: "",
      lastUpdated: "",
    },
    num_mflix_comments: "",


    
  });

  const handleAddMovie = async (e, addMovieData) => {
    e.preventDefault();

    if (
      addMovieData.title === "" ||
      addMovieData.plot === "" ||
      addMovieData.genres.length === 0 ||
      addMovieData.directors.length === 0 ||
      addMovieData.year === "" ||
      addMovieData.imdb.rating === "" ||
      addMovieData.imdb.votes === "" ||
      addMovieData.imdb.id === ""
    ) {
      // make the partiular fields compulsory

      return;
    }

    try {
      await addMovie(addMovieData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
       <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    
   <h1 class="text-center text-3xl font-bold">Add Movie</h1>
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
        required="true"
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
        required="true"
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
        required="true"
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
        required="true"
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
        required="true"
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
        required="true"
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
        required="true"
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
        required="true"
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
<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
<h1 class="text-center text-3xl font-bold">Optional Movie Details</h1>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Runtime
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            runtime: e.target.value,
          });
        }}
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="120 mins"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Rated
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            rated: e.target.value,
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="PG-13"
      />
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Cast
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            cast: e.target.value.split(","),
          });
        }}
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="John Doe, Jane Doe"
      />
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Poster
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            poster: e.target.value,
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="https://www.google.com"
      />

      <label

        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Full Plot
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            fullplot: e.target.value,
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="Its a new movie so we can't reveal it"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Languages
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            languages: e.target.value.split(","),
          });
        }}
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="English, Hindi"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Released
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            released: e.target.value,
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="2024-05-06"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Writers
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            writers: e.target.value.split(","),
          });
        }}
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="John Doe, Jane Doe"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Awards
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            awards: {
              ...addMovieData.awards,
              text: e.target.value,
            },
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="Best Movie of the Year"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Last Updated
      </label>

      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            lastupdated: e.target.value,
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="2024-05-06"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Countries
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            countries: e.target.value.split(","),
          });
        }}
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="India, USA"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Type
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            type: e.target.value,
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="Movie"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Tomatoes Viewer Rating
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            tomatoes: {
              ...addMovieData.tomatoes,
              viewer: {
                ...addMovieData.tomatoes.viewer,
                rating: e.target.value,
              },
            },
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="4.7"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Tomatoes Viewer Num Reviews
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            tomatoes: {
              ...addMovieData.tomatoes,
              viewer: {
                ...addMovieData.tomatoes.viewer,
                numReviews: e.target.value,
              },
            },
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="25"
      />
      
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Tomatoes Viewer Meter
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            tomatoes: {
              ...addMovieData.tomatoes,
              viewer: {
                ...addMovieData.tomatoes.viewer,
                meter: e.target.value,
              },
            },
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="25"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Tomatoes Production
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            tomatoes: {
              ...addMovieData.tomatoes,
              production: e.target.value,
            },
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="Pathè Exchange"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Tomatoes Last Updated
      </label>
      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            tomatoes: {
              ...addMovieData.tomatoes,
              lastUpdated: e.target.value,
            },
          });
        }}
        class="appearance
        -none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="2024-05-06"
      />

      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-first-name"
      >
        Num Mflix Comments
      </label>

      <input
        onChange={(e) => {
          setAddMovieData({
            ...addMovieData,
            num_mflix_comments: e.target.value,
          });
        }}
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        placeholder="25"
      />

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
        </div>


   



</div>
</>
   
  );
}
