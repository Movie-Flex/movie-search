import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useLogout } from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
import { useCancelSubscription } from "../hooks/useCancelSubscription";
import CancelSubscriptionModal from "./CancelSubscription/CancelSubscriptionModal";
import UserDetails from "../components/UserDetails";
import axios from "axios";

export default function Dummy() {

  const navigate=useNavigate()
  const {logout}=useLogout();
  const {user,isLoggedIn}=useContext(UserContext);
  const [cancelSubscriptionButton, setCancelSubscriptionButton] = useState(false);

  const {cancelSubscriptionInfo}=useCancelSubscription();

  if(!isLoggedIn) {
    navigate("/login")
  }
  
  const [refundInfo,setRefundInfo]=useState({});

  const refundDetailsFetch=async()=>{
   try{
       const response=await cancelSubscriptionInfo();
        setRefundInfo(response.refundDetails);
   }
   catch(error){
       console.log("Error",error);
   }
  }


  const fetchData = async () => {
    try {
        const response = await axios.get('')
    }catch (error) {
        console.error('Error fetching data: ', error)
    }
  }



  //for movies data : storing movies data in movies.
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  // Update the fetchMovies function to filter the movies based on the search term
const fetchMovies = async () => {
  try {
    const response = await axios.get('http://localhost:3002/getMovies');
    const movies = response.data;

    // Filter the movies based on the search term
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setMovies(filteredMovies);
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};
  
  return (
      <div>
        <h1 className="flex justify-center items-center">Dummy</h1>
        {user &&(
         <UserDetails user={user}/>
        )}

        <div
        className="flex justify-center space-x-4 mt-4"
        >
        <button 
        onClick={logout}
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Logout

        </button >

        <Link 
        to="/subscription"
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Subscription
        </Link >
        
        <button 
        onClick={() => {
          setCancelSubscriptionButton(true)
          refundDetailsFetch()
        }}
        className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none">
          Cancel Subscription
        </button >

        <input
        type="text"
        value={searchTerm}
        onChange={(event => setSearchTerm(event.target.value))}
        placeholder="Search for a movie"
        />


        {cancelSubscriptionButton && <CancelSubscriptionModal  refundInfo={refundInfo} closeModal={setCancelSubscriptionButton}/>}
        </div>       
      </div>
    );
}