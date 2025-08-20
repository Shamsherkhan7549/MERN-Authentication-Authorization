import React from 'react'
import { useContext } from 'react'
import { userContext } from '../contexts/ContextProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Detail = () => {

    const {users,setUsers} = useContext(userContext)
    const {token, setToken} = useContext(userContext)

    const {id} = useParams();
    
    const [user, setUser] = useState({
        name:"",
        email:"",
        age:""
    })
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()

    const url = import.meta.env.VITE_API_BACKEND_URL;


    const fetchUser = () => {
        const existingUser  = users.filter((ele)=> ele._id === id)[0]
        setUser(existingUser)
    }

    const handlingEdit = (id) => {
        if(isEdit === true){
            setIsEdit(false)
            return
        }
        setIsEdit(true)

    }

    useEffect(()=>{
        fetchUser()
    },[])

       // edit
    const handlingChange = (event) => {
        setUser((prev) => ({...prev, [event.target.name]:event.target.value}))
    }

    const handlingSubmit = async(event) => {
        event.preventDefault()
        const res = await axios.put(url+'/update', user, {headers:{Authorization: `Bearer ${token}`}})
        if(res.data.success){
            console.log(res.data.message)
            setIsEdit(false)
        }else{
            console.log(res.data.message);
            
        }
    }

    const handlingDelete = async(id) => {
        const res = await axios.delete(`${url}/delete/${id}`, {headers:{Authorization:`Bearer ${token}`}})

        if(res.data.success){
            setUsers(prev => prev = users.filter(ele=> ele._id != id))
            navigate('/')
        }else{
            console.log("user not delted or not available")
        }
    }

    
  return (
    <div className='container' style={{lineHeight:".2rem" , textAlign:"start"}}>
        <div className="row">
            <div className="col-4"></div>
      {
        isEdit === true ?
        user && 
        <>
        
        <form className='col-4 py-5 my-5' onSubmit={handlingSubmit}>
            <h4>id : {user._id}</h4>
            <label id='name' className='form-label' >Name</label> <br /> <br /> <br /> <br />
            <input onChange={handlingChange}  className='form-control' name='name' type="text" value={user.name} /> <br /><br /><br /> <br />
            <label  className='form-label'>Email</label> <br /> <br /><br /> <br />
            <input onChange={handlingChange} name='email'  className='form-control' type="text" value={user.email} />  <br /><br /><br /> <br />
            <label  className='form-label'>Age</label> <br /> <br /><br /> <br />
            <input onChange={handlingChange} name='age'  className='form-control' type="text" value={user.age} />  <br /><br />
            <button className='btn btn-success'>save</button>
        </form>
       
        </>
        : 

        user && 
        <div className='col-4 py-5 my-5'>
            <h4  className='form-label'>id: {user._id}</h4>
            <h5  className='form-label'>name: {user.name}</h5>
            <h5  className='form-label'>age: {user.age}</h5>
            <h5  className='form-label'>email: {user.email}</h5>
            <button className='btn btn-primary' onClick={()=>handlingEdit(user._id)}>Edit</button> &nbsp;
            <button className='btn btn-danger' onClick={()=>handlingDelete(user._id)}>Delete</button>
        </div>}
        <div className="col-4"></div>
      </div>
    </div>
  )
}

export default Detail