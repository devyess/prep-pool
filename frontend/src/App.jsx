import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './Screens/Register'
import Login from './Screens/Login'
import Home from './Screens/Home'
import PostQuestion from './Screens/PostQuestion'
import UserQuestions from './Screens/UserQuestions'
import EditQuestion from './Screens/EditQuestion'
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/post-question" element={<PostQuestion/>}/>
          <Route path="/user-questions" element={<UserQuestions/>}/>
          <Route path="edit-question/:id" element={<EditQuestion/>}/>
          <Route path="/" element={<Register/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
