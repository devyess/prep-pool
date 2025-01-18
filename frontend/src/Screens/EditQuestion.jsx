import {useState,useContext,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { AuthContext } from '../context/AuthContext'
import countries from '../assets/countries'
const EditQuestion = () => {
      const {id}=useParams();
      const [questionss,setQuestionss]=useState({
            userName:'',
            country:'',
            company:'',
            question:'',
      });
      const[loading,setLoading]=useState(true);
      const[error,setError]=useState('');
      const {userAuth}=useContext(AuthContext);
      const navigate=useNavigate();

      useEffect(()=>{
            const getQuestion = async()=>{
                  try{
                        const response=await axios.get(`/users/get-question/${id}`,{
                              headers:{
                                    Authorization:`Bearer ${userAuth}`
                              }
                        });
                        setQuestionss(response.data.submission);
                        setLoading(false);
                  }catch(err){
                        setError("unable to fetch your question");
                        setLoading(false);
                  }
            }
            getQuestion();
      },[id,userAuth]);

      const handleEdit=async(e)=>{
            e.preventDefault();
            try{
                  const response=await axios.put(`/users/edit-question/${id}`,questionss,{
                        headers:{
                              Authorization:`Bearer ${userAuth}`
                        }
                  });
                  navigate('/user-questions');
            }catch(err){
                  setError("unable to edit your question");
            }
      }

      const handleBack = () => {
            navigate('/user-questions');
      };

  return (
    <div>
      <button
        onClick={handleBack}
        className='absolute top-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800'
      >
        Back to Questions
      </button>
      <div className='relative bg-gray-300 justify-center items-center'>
      <div className='absolute left-1/3 top-32 bg-blue-400 p-3 rounded-2xl shadow-lg'>
            <form className='mt-4 ml-2 mr-3 mb-2'
            onSubmit={handleEdit}>
                  <label
                  className='block mb-1'>User Name:</label>
                  <input
                  type='text'
                  value={questionss.userName}
                  className='p-2 w-full rounded-md border text-black border-gray-400 mb-2'
                  readOnly>
                  </input>
                  <label
                  className='block mb-1'>Company:</label>
                  <input
                  type='text'
                  value={questionss.company}
                  className='p-2 w-full rounded-md border text-black border-gray-400 mb-2'
                  onChange={(e)=>setQuestionss({...questionss,company:e.target.value})}>
                  </input>
                  <label
                  className='block mb-1'>Country:</label>
                  <select
                  value={questionss.country}
                  onChange={(e) => setQuestionss({...questionss,country:e.target.value})}
                  className="border border-gray-400 p-2 w-80 mt-1 rounded"
                  >
                  <option value="" disabled>Select Country</option>
                        {countries.map((country) => (
                              <option key={country} value={country}>
                              {country}
                  </option>
                  ))}
              </select>
                  <label
                  className='block mb-1'>Question:</label>
                  <input
                  type='text'
                  value={questionss.question}
                  className='p-2 w-full rounded-md border text-black border-gray-400 mb-2'
                  onChange={(e)=>setQuestionss({...questionss,question:e.target.value})}>
                  </input>
                  <button
                  className='bg-blue-500 text-white p-2 rounded-md mt-2'>
                        Edit
                  </button>
            </form>
      </div>

    </div>
    </div>
  )
}

export default EditQuestion