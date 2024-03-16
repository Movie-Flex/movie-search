import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { setIsLoggedIn, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (loginData) => {

    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3002/api/login', loginData);
      setIsLoading(false);

      localStorage.setItem('token', response.token);
      // await TokenVerify(response.token);
      setIsLoggedIn(true);
      toast.success("Login Successful")
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message); 
    }
  };

  const TokenVerify = async (token) => {
    try {
      const response = await axios.get('http://localhost:3002/api/authTest', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      if (response.status === 200) {
        setUser(response.data.userData);
      }
  }catch(error){
    console.log("TokenVerify Error",error)
  }
}

  return { login };
};
