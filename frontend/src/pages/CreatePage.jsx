import {  ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { createRoutesFromElements, Link, useNavigate } from 'react-router';
import axios from "axios";
import api from '../lib/axios';
const CreatePage = () => {
  const[title,setTitle]=useState("");
  const[content,setContent]=useState("");
  const[loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handlesubmit=async(e)=>{
    e.preventDefault();
    if(!title.trim() || !content.trim()){
      toast.error("All fields are mandatory!!!")
      return
    }
    const userid=localStorage.getItem("id");
    setLoading(true);
    try {
      await api.post("/notes",
        {title,content,userid})
        toast.success("New Note created Successfully🎉")
        navigate("/home")
    } catch (error) {
      if(error.response?.status==429){
        toast.error("Slow down! You're creating notes too fast",{
          duration:2000
        })
      }else
        toast.error("Failed to create note");
      console.log("error in creating notes")
    }finally{
      setLoading(false)
    }  
  }
  return (
    <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
              <Link to={"/home"} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className='size-5'/>
              Back to Notes
              </Link>
              <div className='card bg-base-100'>
                <div className='card-body'>
                  <h2 className='card-title text-2xl mb-4'>Create new Note</h2>
                  <form onSubmit={handlesubmit}>
                      <div className='form-control mb-4'>
                        <label className='label'><span className='label-text'>Title</span></label>
                        <input type="text"  placeholder='Note Title' className='input input-bordered' 
                         value={title} 
                         onChange={(e)=>setTitle(e.target.value)} 
                        />
                      </div>

                      <div className='form-control mb-4'>
                        <label className='label'><span className='label-text'>Content</span></label>
                        <textarea type="text"  placeholder='write your notes here.......' className='textarea textarea-bordered min-h-32' 
                         value={content} 
                         onChange={(e)=>setContent(e.target.value)} 
                        />
                      </div>

                      <div className='card-actions justify-end'>
                          <button className=' btn btn-primary' type='submit' disabled={loading}>
                            {loading?"creating..." :"Create Note "}
                          </button>
                      </div>
                      
                  </form>
                </div>
              </div>
            </div>

        </div>

    </div>
  )
}

export default CreatePage