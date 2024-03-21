import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { tempSubscriptionData } from "../utils/SubscriptionTempData";


export const GetAmountDetails=()=>{

   const {token}=useContext(UserContext);


    const getAmountDetails=async ()=>{
       try{
       const tokenObject={token:token};
        const response =await  axios.post("http://localhost:3002/payment/dashboard",tokenObject);
      //   console.log(response.data.subscriptionMeta);
        return response.data.subscriptionMeta;
      

       }
         catch(error){
              console.log("Error",error);
              return tempSubscriptionData;
         }
        
    }

    return {getAmountDetails};
}