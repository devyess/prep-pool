import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../config/axios'
import interview from '../assets/interview.png'
import '../css/form-container.css'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError]=useState('');
  const {userLogin} = useContext(AuthContext);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password
      });
      userLogin(response.data.token);
      navigate('/home')
    } catch (error) {
      setError("Incorrect password or email");
      console.log(error)
    }
  }
  return (
    <div className='realtive w-full min-h-screen'>
      <div className='absolute top-0 left-0 w-2/3 min-h-screen bg-blue-600 flex items-center'>
      <img src={interview} className='absolute left-1/4 w-1/3 h-auto max-w-full max-h-full object-contain' />
      </div>
      <div className='absolute top-0 right-0 w-1/3 min-h-screen bg-gray-200'></div>
    
      <div 
      className='f absolute right-1/4 top-52 items-center justify-center shadow-lg'>
        <div 
        className='bg-white p-4 rounded-2xl shadow-lg size-fit transition duration-500 ease-in-out transform hover:scale-110'>
            <form 
            className='m-4 '>
              
                <label 
                className='block text-sm font-medium text-gray-700 mt-2'>
                  Email*
                  </label>
                <input 
                type='email' 
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                <label 
                className='block text-sm font-medium text-gray-700 mt-2'>
                  Password*
                  </label>
                <input 
                type='password' 
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                <div
                className='flex justify-center items-center'>
                <button
                onClick={handleSubmit}
                className='mt-4 bg-blue-500 text-white p-2 rounded-md'>
                  Login
                  </button>
                </div>
                {/*print the error if there is any*/}
                {error && <div className='text-red-600 mt-4'>{error}</div>}
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register