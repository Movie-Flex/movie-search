import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

export const useAdminMovieFunctions = () => {
  const { token } = useContext(UserContext);
  const addMovie = async (addMovieData) => {
    try {
        const movieData={movieData:addMovieData}
      const response = await axios.post(
        "http://localhost:3002/api/add-movie",
        movieData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Movie Added Successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add movie");
    }
  };

  const deleteMovie = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/delete-movie/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Movie Deleted Successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete movie");
    }
  }

  return { addMovie , deleteMovie};
};
