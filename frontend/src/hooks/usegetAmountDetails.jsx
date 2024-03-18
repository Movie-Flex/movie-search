import axios from "axios";


export const GetAmountDetails=async()=>{


//     const getAmountDetails=async ()=>{/
       try{
        const response =await  axios.post("http://localhost:3002/payment/dashboard");
     //    console.log(response);
        return response.data.data[0];
       }
         catch(error){
              console.log("Error",error);
         }
        
//     }

//     return {getAmountDetails};
}