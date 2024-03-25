import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function UpdateInfo() {
  const { user } = useContext(UserContext);

  return(
    
   <h1>
    update form
   </h1>

  )
}