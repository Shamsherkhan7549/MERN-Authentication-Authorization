import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

  export const userContext = createContext()

const ContextProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const[token, setToken] = useState(()=>{
    return localStorage.getItem("token")||""
  })
  const url = import.meta.env.VITE_API_BACKEND_URL;

  const fetchAllUsers = async() => {
    const res = await axios.get(url+'/readAll')
    const allUsers =  await res.data.data;
    setUsers(prev=> prev=allUsers)
  };

  useEffect(()=>{
    fetchAllUsers()
  })

  useEffect(()=>{
    if(token){
      localStorage.setItem("token", token)
    }else{
      localStorage.removeItem("token")
    }
  },[token])

  const values = {users, setUsers, setToken, token}
  return (
    <userContext.Provider value = {values}>
      {children}
    </userContext.Provider>
  )
}

export default ContextProvider