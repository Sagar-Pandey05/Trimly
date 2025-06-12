import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='h-screen w-full flex justify-center items-center text-center bg-orange-100'>
        <div>
            <h1 className='text-5xl mb-3 font-bold text-orange-600'>Welcome To Trimly</h1>
            <h1 className='text-3xl mb-5 font-bold text-orange-600'>Unlock Your Best Look, With Fair Prices</h1>
            <button
            onClick={
                () => navigate('/register')
            } 
            className='bg-orange-500 hover:bg-blue-500 hover:scale-x-105 rounded-lg text-xl border-none outline-none text-white px-4 py-2 mt-3'>Get Started</button>
        </div>
    </div>
  )
}

export default Home