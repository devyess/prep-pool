import { useEffect, useRef, useState,useContext } from 'react'
import axios from '../config/axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import ClickableCard from '../components/ClickableCard'

const UserQuestions = () => {
      const[userName,setUserName]=useState('');
      const[company,setCompany]=useState('');
      const[country,setCountry]=useState('');
      const[question,setQuestion]=useState('');

      const { userAuth } = useContext(AuthContext);
      const navigate = useNavigate();
      const alertShown = useRef(false);
      const handleBack = () => {
            navigate('/home');
      }

      useEffect(() => {
            if (!userAuth && !alertShown.current) {
            alert('You need to login first');
            alertShown.current = true;
            navigate('/login');
            }
        }, [userAuth, navigate]);
      
      const getData = async () => {
            const response = await axios.get('/users/get-self-questions', {
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
  return (
    <div>
      <nav>
            <button
            className='bg-blue-500 text-white p-2 rounded-md m-3 ml-6 pl-3 pr-3'
            onClick={handleBack}>
                  Back to home
            </button>
      </nav>
      <div className='flex flex-wrap justify-center gap-4 m-4'>
            {response.data.questions && response.data.questions.map((question) => (
            <ClickableCard
                  key={question._id}
                  userName={question.userName}
                  countryName={question.country}
                  companyName={question.company}
                  createdAt={question.createdAt}
                  question={question.question}
                  onEdit={() => navigate('/edit-question/' + question._id)}
            />
            ))}
    </div>
  </div>
  )
}

export default UserQuestions