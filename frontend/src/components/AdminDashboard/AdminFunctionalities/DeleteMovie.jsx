import { useState } from "react";
import { useAdminMovieFunctions } from "../../../hooks/useAdminMovieFunctions";

export default function DeleteMovie() {
    const { deleteMovie } = useAdminMovieFunctions();

    const [deleteMovieId, setDeleteMovieId] = useState("");

    const handleDeleteMovie = async (e, addMovieData) => {
        e.preventDefault();

        try {
            await deleteMovie(deleteMovieId);
        } catch (error) {
            console.log(error);
        }
    }

    return(

        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                        for="grid-first-name"
                    >
                        Movie ID
                    </label>
                    <input
                        onChange={(e) => {
                            setDeleteMovieId(e.target.value);
                        }}
                        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                        id="grid-first-name"
                        type="text"
                        placeholder="Movie ID"
                    />
                </div>
            </div>
            <button
                onClick={(e) => {
                    handleDeleteMovie(e, deleteMovieId);
                }}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
            >
                Delete Movie
            </button>
        </div>

      
    )
 }