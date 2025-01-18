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

  const userQuestionNavigation = () => {
    navigate('/user-questions');
  }

  const handlePostQuestions = () => {
    navigate('/post-question');
  }

  const getData = async () => {
      const response = await axios.get('/users/get-all-questions', {
      headers: {
            Authorization: `Bearer ${userAuth}`
      }
      });
      return response;
      }
      const [response, setResponse] = useState({ data: [] });
      useEffect(() => {
          getData().then((response) => {
          setResponse(response);
          });
      }, []);
      console.log(response.data.questions);
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
            className='bg-blue-600 m-3 ml-14 p-2 text-xl text-white rounded-lg hover:bg-blue-800 hover:font-extrabold
            transition duration-500 ease-in-out transform hover:scale-110'
            onClick={handlePostQuestions}>
                Post Question
            </button>
          </div>
          
        </div>

        {/* Center Section */}
        <div style={{scrollbarWidth:"none"}} className="w-2/4 overflow-y-auto p-4 webkit-scrollbar">
          {response.data.questions && response.data.questions.map((question) => (
            <div
              key={question._id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{question.userName}</h2>
                  <p className="text-sm text-gray-600">{question.country}</p>
                  <p className="text-sm text-gray-600">{question.company}</p>
                </div>
                <p className="text-sm text-gray-500">{question.createdAt}</p>
              </div>
              <p className="mt-4 text-gray-700 text-base leading-relaxed">{question.question}</p>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-1/4 flex flex-col items-center justify-center">
          <button
          className='bg-blue-600 m-3 p-2 text-xl text-white rounded-lg hover:bg-blue-800 hover:font-extrabold transition
          duration-500 ease-in-out transform hover:scale-110'
          onClick={userQuestionNavigation}>
            View your Questions
          </button>
          <button 
          className='bg-red-600 m-3 p-2 text-xl text-white rounded-lg hover:bg-red-800 hover:font-extrabold
          transition duration-500 ease-in-out transform hover:scale-110'
          onClick={handleLogout}>
              Logout
          </button>
        </div>
      </div>

  )
}

export default Home