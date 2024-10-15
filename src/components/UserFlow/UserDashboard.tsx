"use client"
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [userName , setUserName] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  
  useEffect(()=>{
    axios.get("http://localhost:3005/api/v1/user/username",{
      headers:{
        Authorization:"Bearer "+ window.localStorage.getItem("token")
      }
    }).then((res)=> setUserName(res.data.user))
  },[userName])
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* User Icon and Name */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          {/* User Icon (Placeholder) */}
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4.4 0-8 3.6-8 8v1h16v-1c0-4.4-3.6-8-8-8z"/>
          </svg>
        </div>
        <span className="text-yellow-500">{userName}</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Favorites</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <Link href="/userflow/familyMembers"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Family Members</li></Link>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleSignOut}>Sign Out</li>

          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

