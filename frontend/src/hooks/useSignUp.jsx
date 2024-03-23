import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export const useSignup = () => {
  const navigate=useNavigate()

    const { setIsLoggedIn,token,setUser,setToken} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    
  
    const signup = async (signupData) => {
      if(signupData.password!==signupData.confirmPassword){
        toast.error("Password and Confirm Password do not match");
        return;
      }
      
      if(signupData.password.length<8){
        toast.error("Password must be atleast 8 characters long");
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.post('http://localhost:3002/api/signup', signupData);
        // console.log(response.data.token);

       if(response.status===200){
         setIsLoading(false);
         localStorage.setItem('token', response.data.token);
         await TokenVerify(response.data.token);
         setToken(response.data.token)
         setIsLoggedIn(true);
         toast.success("SignUp Successful")
         navigate('/')
       }

       if(response.status===209){
         setIsLoading(false);
         toast.error(response.data.message);
      }
      
      } catch (error) {
        setIsLoading(false);
        toast.error("Sign up Failed"); 
      }
    };

    const TokenVerify = async (token) => {
      try {
        const tokenObject = { token: token };
        const response = await axios.post(
          "http://localhost:3002/api/getUser",
          tokenObject
        );
        // console.log(response);
  
        if (response.status === 200) {
          console.log(response.data);
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
        }
      } catch (error) {
        console.log("TokenVerify Error", error);
      }
    };
  
  

  return { signup }
}