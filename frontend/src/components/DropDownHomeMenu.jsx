import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout";


export default function DropDownHomeMenu() {
    const [dropDownModal, setDropDownModal] = useState(false)

    const navigate=useNavigate()
    const {logout}=useLogout();

    const logoutAction=()=>{
        logout();
        navigate('/')
        window.location.reload();
    
    }

    return(
        <div className="relative inline-block text-left">
        <div>
          <button type="button"
          onClick={()=>setDropDownModal(!dropDownModal)}
          
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900
           shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            Menu
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75
               0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        {dropDownModal && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black
            ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
             <div className="py-1" role="none">
               <Link to="/profile" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Profile</Link>
               <Link to="/subscription" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Buy Subscription</Link>
               <button 
               onClick={()=>logoutAction()}
               className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">
                Logout
                </button>
             </div>
           </div>
        )}
      </div>
      
    )
}