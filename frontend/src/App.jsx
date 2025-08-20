import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import About from './components/About/About'
import Detail from './components/Detail'
import Navbar from './components/Navbar'
import SaveUser from './components/Save User/SaveUser'
import Login from './components/Login/Login'
import { useContext } from 'react'
import { userContext } from './contexts/ContextProvider'

function App() {

  const{token} = useContext(userContext);


  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/detail/:id' element={token?<Detail/>: <Login/>} />
          <Route path='/signup' element={<SaveUser/>} />
          <Route path='/login' element={<Login/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
