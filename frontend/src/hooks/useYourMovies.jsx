import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const useYourMovies = () => {
  const { token } = useContext(UserContext);

  const fetchFavouriteMovies = async () => {
    try {
      const response = await axios.get(
        "https://movie-flex-open-soft2024-backend.vercel.app//api/getFavouriteMovies",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        return response.data.favouriteMovies;
      }
    } catch (error) {
      console.error("Error fetching favourite movies", error);
    }
  };

  const fetchwatchLaterMovies = async () => {
    try {
      const response = await axios.get(
        "https://movie-flex-open-soft2024-backend.vercel.app//api/getWatchLaterMovies",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data.watchLaterMovies;
      }
    } catch (error) {
      console.error("Error fetching watch later movies", error);
    }
  };

  return {
    fetchFavouriteMovies,
    fetchwatchLaterMovies,
  };
};
