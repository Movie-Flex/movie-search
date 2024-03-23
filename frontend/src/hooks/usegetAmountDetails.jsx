import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { tempSubscriptionData } from "../utils/SubscriptionTempData";


export const GetAmountDetails=()=>{

   const {token}=useContext(UserContext);


    const getAmountDetails=async ()=>{
       try{

        const response =await  axios.post("http://localhost:3002/payment/dashboard",{} ,{
          headers: {
            'authorization': `Bearer ${token}`,
          },
        });
        return response.data.subscriptionMeta;
      

       }
         catch(error){
              console.log("Error",error);
              return tempSubscriptionData;
         }
        
    }

    return {getAmountDetails};
}