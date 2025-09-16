import { CloudCog, PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import {formatDate} from "../lib/utlis.js"
import axios from 'axios'
import toast from 'react-hot-toast'

const NoteCard = ({note}) => {
    const navigate=useNavigate();
    const handleDelete=async(e,id)=>{
        e.preventDefault();   // stop <Link> navigation
         e.stopPropagation(); 
        if(!window.confirm("Notes will be deleted Permanently..."))return;
        try {
            await axios.delete(`http://localhost:5001/api/notes/${id}`)
            toast.success("notes deleted");
            navigate("/home");
        } catch (error) {
            
        }
    }
  return (
    <Link to={`/note/${note._id}`} 
    className=' card bg-base-100 hover:shadow-lg transition-all 
    duration-200 border-t-4 border-solid border-[#10853b]'>
       <div className='card-body'>
      
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        
        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-base-content/60'>
                {formatDate(new Date(note.createdAt))}
            </span>
            
            <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4'/>
                <button className='btn btn-ghost btn-xs text-error' onClick={()=>(handleDelete(event,note._id))}>
                    <Trash2Icon className='size-4'/>
                </button>
            </div>
        </div>
       </div>
       </Link>
  
  )
}

export default NoteCard