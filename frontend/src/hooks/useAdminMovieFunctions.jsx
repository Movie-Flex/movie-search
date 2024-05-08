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
        "https://movie-flex-open-soft2024-backend.vercel.app//api/add-movie",
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
        `https://movie-flex-open-soft2024-backend.vercel.app//api/delete-movie/${id}`,
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

    const adminGenerateToken = async (generateAdminData) => {
        try {
        const response = await axios.post(
            "https://movie-flex-open-soft2024-backend.vercel.app//api/generateAdminToken",
            generateAdminData,
            {
            headers: {
                authorization: `Bearer ${token}`,
            },
            }
        );
        if (response.status === 200) {
            toast.success("Admin Generated Successfully");
            return response.data.adminToken;
        } else {
            toast.error(response.data.message);
        }
        } catch (error) {
        toast.error("Failed to generate admin");
        }
    }

    const getSubscriptionData = async (page) => {
      try{
        const response = await axios.get(`https://movie-flex-open-soft2024-backend.vercel.app//api/subs?p=${page}`,{
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if(response.status === 200){
          return response.data;
        }else{
          console.log(response.data.message);
        }
      }
      catch(error){
        console.log(error);
      }
    }

  return { addMovie , deleteMovie,adminGenerateToken,getSubscriptionData};
};
