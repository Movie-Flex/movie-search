import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';


export const useSignup = () => {

    const { setIsLoggedIn,token,setToken} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    
  
    const signup = async (signupData) => {
      try {
        setIsLoading(true);
        const response = await axios.post('http://localhost:3002/api/signup', signupData);

        // if(!isLoading)
        setIsLoading(false);
        setToken(response.data.token)
        // setIsLoggedIn(true);
        toast.success("SignUp Successful")
      } catch (error) {
        setIsLoading(false);
        toast.error("Sign up Failed"); 
      }
    };
  
  

  return { signup }
}