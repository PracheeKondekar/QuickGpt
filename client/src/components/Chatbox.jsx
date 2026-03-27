// import React, { useState, useEffect }from 'react'
// import { useAppContext } from '../context/AppContext'
// import { assets } from '../assets/assets'

// const Chatbox = () => {
//   const {selectedChats, theme} = useAppContext()
//   const[messages, setMessages] = useState([])
//   const[loading, setLoading] = useState(false)

//   useEffect(()=>{
//     if(selectedChats){
//       setMessages(selectedChats.messages)
//     }},[selectedChats])
//   return (
//     <div className='flex-1 flex flex-col justify-between
//      m-5 md:m-10 x1:mx-30 max-md:mt-14 2x1:pr-40'>
//         {/*Chat messages*/}
//         <div className='flex-1 mb-5 overflow-y-scroll'>
//            {messages.length === 0 && <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
//             <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt='Logo' className='w-full max-w-56 sm:max-w-60' />
//           <p className='mt-5 text-4x1 sm:text-6x1 text-center text-gray-400 dark:text-white'>Ask me anything.</p>
//           </div> )}
// {messages.map((message, index) => <Message key={index} message={message} />)}
//         </div>
//         {/*prompt input box*/}
// <form className='flex items-center gap-3 border-t border-gray-300 dark:border-[#80609F]/15 pt-5'></form>
//     </div>
//   )
// }

// export default Chatbox
import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import moment from 'moment'

const Chatbox = () => {
  const containerRef = useRef(null)
  const { selectedChats, theme } = useAppContext()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt , setPrompt] = useState('')
  const[mode, setMode] = useState('text')
  const[isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    if (selectedChats) {
      setMessages(selectedChats.messages)
    }
  }, [selectedChats])

useEffect(() => {
  if (containerRef.current) {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }
}, [messages])
  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
      
      {/* Chat messages */}
      <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>
        
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            
            <img
              src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
              alt='Logo'
              className='w-full max-w-56 sm:max-w-60'
            />

            <p className='mt-5 text-3xl sm:text-5xl text-center text-gray-400 dark:text-white'>
              Ask me anything.
            </p>

          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
{/*three dots loading animation*/}
{loading && <div className=' loader flex items-center gap-1.5'>
  <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white
  animate-bounce'> </div>
    <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white
  animate-bounce'> </div>
    <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white
  animate-bounce'> </div>
  </div>}
      </div>
        {mode === 'image' && (<label className='inline-flex items-center gap-2 mb-3
        text-sm mx-auto'>
          <p className='text-xs'>Publish Generated Image to Community</p>
          <input type='checkbox' name="" id="" className='cursor-pointer'
           checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        </label>)}
      {/* prompt input box */}
      <form  onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30
       border-primary
       dark:border-[#80609F]/30 rounded-full max-w-2x1 p-3 p1-4
        mx-auto flex gap-4 items-center '>
      <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
        <option className='dark:bg-purple-900' value="text">Text</option>
        <option className='dark:bg-purple-900' value="image">Image</option>

      </select>
      <input
        type='text'
      value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className='flex-1 w-full text-sm outline-none'
        placeholder= 'Type your prompt here...' required />
      <button disabled={loading}  >
        <img src={ loading ? assets.stop_icon: assets.send_icon} alt='' 
        className='w-8 cursor-pointer' />
      </button>
      </form>

    </div>
  )
}

export default Chatbox
