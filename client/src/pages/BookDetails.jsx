import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";


function BookDetails(){
    const {id}= useParams();
    const [book,setBook]= useState({});


    useEffect(() =>{
          axios.get(`http://localhost:5000/api/book/${id}`)
          .then(res => {
            console.log("Fetched book details:", res.data);
            setBook(res.data);
        })
          .catch(err => console.error(err));
    },[id]);

    return (
        <>
        <div className="bg-amber-200 pt-24">
            <div className='flex justify-between align-items-center p-16'>
                <img src={book.img} alt={book.name} className='w-60 h-100'/>
                <div>
                    <h1 className='font-extrabold text-black text-5xl'>{book.title}</h1>
                    <p className='text-2xl' >{book.author}</p>
                    <p className='w-250 text-lg'>{book.desc}</p>
                </div>
            </div>
        </div>

        </>

    )
};

export default BookDetails;