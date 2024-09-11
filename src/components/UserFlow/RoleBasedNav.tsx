import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Popup from '../trainer-dashboard/PopUp';

const RoleBasedNav = () => {
    const [role , setRole] = useState("");
    const [isApproved, setIsApproved] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleClick =() => {
    setPopupMessage("Wait for admin approval");
    setPopupVisible(true);
  }
  
  useEffect(()=>{
    axios.get("http://localhost:3005/api/v1/user/username",{
      headers:{
        Authorization:"Bearer "+ window.localStorage.getItem("token")
      }
    }).then((res)=> {
        setRole(res.data.role);
        setIsApproved(res.data.isApproved);
    })
  },[])
  return (
    <div>
    {!isApproved && <Popup
    message={popupMessage}
    isOpen={popupVisible}
    onClose={() => setPopupVisible(false)}
    redirectTo="/"
    />}
    {(role === "trainer") ?
    <div> <Link
        href={isApproved ? "/userflow/addListing" : "/"}
        onClick={handleClick}
        className="bg-blue-300 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200"
      >
        {" "}
        Add Listing
      </Link>
      
      </div>
      :<div/>}
      </div>
  )
}

export default RoleBasedNav