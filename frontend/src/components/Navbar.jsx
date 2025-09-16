import React from 'react'
import { Link, useNavigate } from 'react-router'
import {PlusIcon,LogOutIcon} from "lucide-react";

const Navbar = () => {
  const navigate=useNavigate();
  function handleLogout(){
    localStorage.removeItem("id");
    navigate("/");
  }
  return (
    <header className='bg-base-3 border-b border-base-content/10'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'><Link to={"/home"}>ThinkBoard</Link></h1>
          <div className='flex items-center gap-4'>
            <Link to={"/create"} className='btn btn-outline'>
            <PlusIcon className='size-5' />
            <span>new Note</span>
            </Link>
            <button onClick={handleLogout} className='btn btn-outline'>
            <LogOutIcon className='size-5' />
            <span>  Logout </span>
            </button>
          </div>
        </div>

      </div>

    </header>
  )
}

export default Navbar