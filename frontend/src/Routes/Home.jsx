import React, { useEffect,useContext,useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../config/axios'

const Home = () => {
  const {userAuth, userLogout} = useContext(AuthContext);
  const [isLoggingOut,setIsLoggingOut]=useState(false);
  const navigate = useNavigate();
  const alertShown = useRef(false);

  useEffect(() => {
    if (!userAuth && !alertShown.current && !isLoggingOut) {
      alert('You need to login first');
      alertShown.current = true;
      navigate('/login');
    }
  }, [userAuth, navigate,isLoggingOut]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post('/users/logout',{},{
        headers:{
          Authorization:`Bearer ${userAuth}`
        }
      });
      userLogout();
      alertShown.current = true;
      navigate('/login');
    } catch (error) {
      console.log(error);
    }finally {
      setIsLoggingOut(false);
    }
  }

  const handlePostQuestions = () => {
    navigate('/post-question');
  }

  return (
      <div className="flex h-screen">
        {/* Left Section */}
        <div 
        className="relative w-1/4 flex justify-center">
          <div 
          className='absolute top-1/4 '>
            <h1 
            className='font-mono hover:font-serif text-3xl font-bold '>
              Had an Interview?
            </h1>
            <button 
            className='bg-blue-600 m-3 p-2 text-xl text-white rounded-lg hover:bg-blue-800 hover:font-extrabold
            transition duration-500 ease-in-out transform hover:scale-110'
            onClick={handlePostQuestions}>
                Post Question
            </button>
          </div>
          
        </div>

        {/* Center Section */}
        <div className="w-2/4 bg-green-200">

        </div>

        {/* Right Section */}
        <div className="w-1/4 bg-blue-200">

        </div>
      </div>

  )
}

export default Home