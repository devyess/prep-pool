import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './Routes/Register'
import Login from './Routes/Login'
import Home from './Routes/Home'
import PostQuestion from './Routes/PostQuestion'
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/post-question" element={<PostQuestion/>}/>
          <Route path="/" element={<Register/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
