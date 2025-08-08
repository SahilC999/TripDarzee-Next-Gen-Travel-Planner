import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'


function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 '> 
        <h1
        className='font-extrabold text-[40px] text-center mt-12'>
            <span className='text-orange-600'>Discover Your Next Adventure:</span> Personalised Itenaries at your FingerTips
        </h1>
        <p
        className='test-xl text-gray-500 text-center'>
            Your personal Trip Planner and Curator, creating personal itenaries tailored to your interests and budget
        </p>
        {/* <Link to={'/create-trip'}>
            <button className='bg-orange-500 rounded-full p-3 text-sm text-black-500 text-center'>Get Started, It's FREE !</button>
        </Link>
         */}

        <img src="hero.jpg" className='rounded-md m-6'/>
    </div>
  )
}

export default Hero