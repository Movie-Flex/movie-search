import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";



export const CancelSubscription=async()=>{

   const {token}=useContext(UserContext);


//     const getAmountDetails=async ()=>{/
       try{
       const tokenObject={token:token};
        const response =await  axios.post("http://localhost:3002/payment/cancel",tokenObject);
     //    console.log(response);
        return response.data.data[0];
       }
         catch(error){
                console.log("Error",error);
         }
        
//     }

//     return {getAmountDetails};
}