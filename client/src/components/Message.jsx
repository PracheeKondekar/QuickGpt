// import React from 'react'

// const Message = ({message}) => {
//   return (
//     <div>
//     {message.role ===  'user' ? (
//       <div className='flex items-start justify-end my-4 gap-2'>
//          <div className=' flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-
//          [#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2x1'></div>
//              <p className='text-sm dark:text-primary'>{message.content}</p>
//       <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{message
//         .timestamp}</span>
//       </div>
//       <img src={assets.user_icon} alt='' className='w-full max-w-md mt-2 rounded-full' />
//       </div>
//     ) : (
//       <div>{}</div>
//         )}    </div>
//   )
// }

// export default Message
// import React from 'react'
// import { assets } from '../assets/assets'

// const Message = ({ message }) => {
//   return (
//     <div>
//       {message.role === 'user' ? (
//         <div className="flex items-start justify-end my-4 gap-2">
          
//           <div className="flex flex-col gap-1 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
//             <p className="text-sm dark:text-primary">{message.content}</p>
//             <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
//               {message.timestamp}
//             </span>
//           </div>

//           <img
//             src={assets.user_icon}
//             alt=""
//             className="w-8 rounded-full"
//           />
//         </div>
//       ) : (
//            {/* assistant message UI here */}
//         <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2x1 
//         bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4'>
//        {message.isImage ? (
//         <img src={message.content} alt="" className="w-full max-w-md mt-2 rounded-md" />
//        ):(<div className="text-sm dark:text-primary">{message.content}</div>)}
//         </div>
//       )}
//       <span>{message.timestamp}</span>
//     </div>
//   )
// }

// export default Message
// import React from 'react'
// import { assets } from '../assets/assets'

// const Message = ({ message }) => {
//   return (
//     <div>
//       {message.role === 'user' ? (
//         <div className="flex items-start justify-end my-4 gap-2">

//           <div className="flex flex-col gap-1 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
//             <p className="text-sm dark:text-primary">{message.content}</p>
//             <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
//               {message.timestamp}
//             </span>
//           </div>

//           <img
//             src={assets.user_icon}
//             alt=""
//             className="w-8 h-8 rounded-full"
//           />
//         </div>
//       ) : (
//         <div className="flex items-start gap-2 my-4">

//           <img
//             src={assets.logo_icon}
//             alt=""
//             className="w-8 h-8 rounded-full"
//           />

//           <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md">
            
//             {message.isImage ? (
//               <img
//                 src={message.content}
//                 alt=""
//                 className="w-full max-w-md mt-2 rounded-md"
//               />
//             ) : (
//               <div className="text-sm dark:text-primary">
//                 {message.content}
//               </div>
//             )}

//             <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
//               {message.timestamp}
//             </span>

//           </div>
//           <img src={assets.user_icon} alt="" className="w-8 rounded-full" />
//         </div>
//       ):(
//       <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2x1 bg-primary/20
//       dark:bg-[#57317C]/3- border border-[#80609F]/30 rounded-md my-4'>
//         {message.isImage ? (
//           <img src={message.content} alt=""  className='w-full max-w-md
//           mt-2 rounded-md'/>
//         ):( <div className='text-sm dark:text-primary reset-tw'>{message.content}</div>)}
        
//       </div>)}
//       <span >{message.timestamp}</span>
//     </div>
//   )
// }

// export default Message
import React from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from  'react-markdown'
import { useEffect } from 'react'
import Prism from 'prismjs'
const Message = ({ message }) => {
  useEffect(() => { Prism.highlightAll() },[message.content])
  return (
    <div>
      {message.role === 'user' ? (

        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex flex-col gap-1 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-primary">{message.content}</p>
            <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          <img
            src={assets.user_icon}
            alt=""
            className="w-8 h-8 rounded-full"
          />
        </div>

      ) : (

        <div className="flex items-start gap-2 my-4">

          <img
            src={assets.logo_icon}
            alt=""
            className="w-8 h-8 rounded-full"
          />

          <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl
           bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 
           rounded-md">

            {message.isImage ? (
              <img
                src={message.content}
                alt=""
                className="w-full max-w-md mt-2 rounded-md"
              />
            ) : (
              <div className="text-sm dark:text-primary reset-tw">
                <Markdown>{message.content}</Markdown>
              </div>
            )}

            <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>
              {moment(message.timestamp).fromNow()}
            </span>

          </div>

        </div>
      )}
    </div>
  )
}

export default Message
