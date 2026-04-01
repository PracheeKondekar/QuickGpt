// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'
// const Loading = () => {
//   const navigate = useNavigate()
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       navigate('/')
//     },8000)
//     return () => clearTimeout(timeout)
//   },[])
//   return (
//     <div className='bg-gradient-to-b from-[#531B81] to-[#291848]
//     backdrop-opacity-60 flex items-center justify-center h-screen 
//     w-screen text-white text-2x1' >
//      <div className='w-10 h-10 rounded-full border-3
//      border-white border-t-transparent animate-spin'> </div>
//     </div>
//   )
// }

// export default Loading
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'
const Loading = () => {
  const navigate = useNavigate()
  const {fetchUser} = useAppContext()

  const [searchParams] = useSearchParams()
useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser()
      navigate('/')
    },8000)
    return () => clearTimeout(timeout)
  },[])
 

  return (
    <div className='bg-gradient-to-b from-[#531B81] to-[#291848]
    flex items-center justify-center h-screen 
    w-screen text-white text-2xl' >
      
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 rounded-full border-4
        border-white border-t-transparent animate-spin'></div>

        <p>Verifying Payment...</p>
      </div>

    </div>
  )
}

export default Loading
