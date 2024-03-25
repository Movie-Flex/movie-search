import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import toast from 'react-hot-toast';

export const useUpdateProfile = () => {
  const { token,setExtraUserData } = useContext(UserContext);

  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/updateProfile",
        updatedData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );


        if (response.status === 200) {
            setExtraUserData(response.data);
            toast.success("Profile Updated Successfully");
        }

    } catch (error) {
      console.log(error);
    }
  };


    const getUpdatedProfile = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3002/api/userProfile",
                {},
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setExtraUserData(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { updateProfile,getUpdatedProfile };
};
