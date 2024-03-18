import axios from "axios";


export const GetAmountDetails=async()=>{


//     const getAmountDetails=async ()=>{/
       try{
        const response =await  axios.get("http://localhost:3002/payment/dashboard");
        console.log(response);
        return response.data.subscription_types;
       }
         catch(error){
              console.log("Error",error);
         }
        
//     }

//     return {getAmountDetails};
}