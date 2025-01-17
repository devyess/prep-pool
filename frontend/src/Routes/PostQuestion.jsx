import { useState, useEffect,useContext,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import countries from '../assets/countries'
import axios from '../config/axios'
const PostQuestion = () => {
      const [userName, setUserName] = useState('');
      const [country, setCountry] = useState('');
      const [company, setCompany] = useState('');
      const [question, setQuestion] = useState('');
      const [notification, setNotification] = useState('');
      const {userAuth} = useContext(AuthContext);
      const navigate = useNavigate();
      const alertShown = useRef(false);

      useEffect(() => {
            if (!userAuth && !alertShown.current) {
            alert('You need to login first');
            alertShown.current = true;
            navigate('/login');
            }
            }, [userAuth, navigate]);

            const handleSubmit = async (e) => {
                  e.preventDefault();             
                  try {
                    await axios.post('/users/post-question', {userName,company,country,question}, {
                      headers: {
                        Authorization: `Bearer ${userAuth}`
                      }
                    });
                    setNotification('Question is now published!');
                    setTimeout(() => {
                      navigate('/home');
                    }, 2000); 
                  } catch (err) {
                    console.log(err);
                  }
                };
      return (
            <div style={{ backgroundColor: "#79D7BE" }} className='w-full min-h-screen'>
            <form className='flex flex-col items-center mt-10 gap-2' onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border border-gray-400 p-2 w-80 mt-4 rounded"
              />
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border border-gray-400 p-2 w-80 mt-4 rounded"
              />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border border-gray-400 p-2 w-80 mt-4 rounded"
              >
                  <option value="" disabled>Select Country</option>
                        {countries.map((country) => (
                              <option key={country} value={country}>
                              {country}
                  </option>
                  ))}
              </select>
              <textarea
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border border-gray-400 p-2 w-80 mt-4 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 w-80 mt-4 rounded transition-transform transform hover:scale-105">
                Publish Question
              </button>
            </form>
            {notification && (
              <div className="mt-4 p-2 bg-green-500 text-white rounded">
                {notification}
              </div>
            )}
          </div>
      )
}

export default PostQuestion