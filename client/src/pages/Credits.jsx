
import React, {useState,useEffect} from 'react'
import Loading from "./Loading"
import { dummyPlans } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import {toast} from 'react-hot-toast'
const Credits = () => {
  const[plans, setPlans] = useState([])
  const[loading, setLoading] = useState(true)
  const {token, axios } = useAppContext()

  const fetchPlans = async() => {
    try{
     const {data} = await axios.get('/api/credit/plans',
      { headers: {Authorization: token}})
     if(data.success){
      setPlans(data.plans)
     }
     else{
      toast.error(data.message || 'Failed to fetch plans')
     }
    } catch(error){
     toast.error(error.message)
    }
    setLoading(false)
  }

  const purchasePlan = async(planId) => {
    try{
      const {data} = await axios.post('/api/credit/purchase', {planId},
        {headers: {Authorization: token}})
          if (data.success) {
    setTimeout(() => {
      window.location.href = data.url
    }, 1000) // ⏳ allow toast to show
  } else {
    throw new Error(data.message)
  }
  // else{
  //         toast.error(data.message )
  //       }
    }catch(error){
      toast.error(error.message)
    }}
  useEffect(() => {
    fetchPlans()
  },[])
  if (loading) {
    return <Loading />
  }
  return (
    <div className="max-w-7xl h-screen overflow-y-scroll 
    mx-auto px-4 sm:px-6 lg:px-8 py-12">
   <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-10 x1:mt-30">Credits Plans</h2>
   <div className='flex flex-wrap justify-center gap-8'>
    {plans.map((plan) => (
      <div key={plan._id} className={`border border-gray-200 
        dark:border-purple-700 rounded-lg shadow hover:shadow-lg 
        transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id === "pro" ? "bg-gradient-50 dark:bg-purple-900" : "bg-white dark:bg-transparent "}`}>
          <div className='flex-1'>
            <h3 className='text-x1 font-semibold text-gray-900
            dark:text-white mb-2'>{plan.name}</h3>
            <p className='text-2x1 font-bold text-purple-600 dark:text-purple-300
            mb-4'>${plan.price}
              <span className='text-base font-normal text-gray-600
              dark:text-purple-200'>{' '}/ {plan.credits} credits</span>

            </p>
            <ul className='list-disc list-inside text-sm
            text-gray-700 dark:text-purple-200 space-y-1'>{plan.features.map((feature, index) => (
              <li key={index} className='text-gray-600 dark:text-purple-200 mb-2'>• {feature}</li>
            ))}</ul>
          </div>
{/* <button onClick={() => toast.promise(purchasePlan(planId))
  ,{loading:"...Processing"}
} className='mt-6 bg-purple-600 font-medium py-2 rounded
 hover:bg-purple-700 active:bg-purple-800 text-white transition-colors
  cursor-pointer'>Buy Now</button> */}
  <button
  onClick={() =>
    toast.promise(
      purchasePlan(plan._id),
      {
        loading: "Processing..."
      }
    )
  }
  className='mt-6 bg-purple-600 font-medium py-2 rounded
  hover:bg-purple-700 active:bg-purple-800 text-white transition-colors
  cursor-pointer'
>
  Buy Now
</button>
        </div>
      ))}
   </div>
    </div>
  )
}

export default Credits
{/* <button
  onClick={() =>
    toast.promise(
      purchasePlan(plan._id),
      {
        loading: "Processing...",
        success: "Redirecting...",
        error: "Failed to purchase"
      }
    )
  }
  className='mt-6 bg-purple-600 font-medium py-2 rounded
  hover:bg-purple-700 active:bg-purple-800 text-white transition-colors
  cursor-pointer'
>
  Buy Now
</button>

export default Credits */}
