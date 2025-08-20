import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { userContext } from '../../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const { users } = useContext(userContext)
  const {setToken} = useContext(userContext)
  const navigate = useNavigate()
  const handlingDetails = (id) => {
    navigate(`/detail/${id}`)
  }

  const handlingLogout = () => {
    setToken("");
    localStorage.setItem("token", " ")
    console.log("You are logout")
  }



  return (

    <div className='container '>


      <h3> <u> All Users</u>  &nbsp; &nbsp;  <button className='btn btn-primary' onClick={handlingLogout}>Logout</button> </h3>
      
      {

        users.map((ele) => (
          <div className="row "  key={ele._id}>
            <div className="col-4"></div>
            <div className=" col-4 mb-3 text-start">
              <label htmlFor="name" className="form-label">Name : {ele.name}</label> <br />
              <label htmlFor="email" className="form-label">Email : {ele.email}</label><br />
              <button onClick={() => handlingDetails(ele._id)} className="btn btn-primary">Details</button> <br /> <br />
            </div>
            <div className="col-4"></div>
          </div>


        ))
      }


    </div>
  )
}

export default Home