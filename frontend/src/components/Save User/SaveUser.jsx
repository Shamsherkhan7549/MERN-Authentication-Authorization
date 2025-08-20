import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { userContext } from '../../contexts/ContextProvider';

const SaveUser = () => {
    const [user, setUser] = useState({});
    const[confirmPassword, setConfirmPassword] = useState("")
    const url = import.meta.env.VITE_API_BACKEND_URL;
    const navigate = useNavigate()
    const {token, setToken} = useContext(userContext)
    const handlingChange = (event) => {
        setUser(prevUser=> ({...prevUser, [event.target.name]:event.target.value}))
    }

    const handlingChangeConfirmPassword = (event) => {
        setConfirmPassword(prev=> prev=event.target.value)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(user.password === confirmPassword){
            const res = await axios.post(url + '/create' , user);
            if(res.data.success){
                setToken(res.data.token)
                navigate('/');
            }else{
                navigate('/signup')
            }
            
        }else{
            console.log("Please confirm password")
        }
        
    }

    return (
        <>
        <div className='container '>
            <div className="row">
            <div className="col-2"></div>
            
            <form onSubmit={handleSubmit}  className='col-8 py-5 text-start'>
                <h3> <u> SignUp</u></h3>
                
                 <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input onChange={handlingChange}  type="text"  className="form-control" id="name" name='name' aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input onChange={handlingChange}  type="text"  className="form-control" id="username" name='username' aria-describedby="emailHelp"/>
                </div>
                 <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input onChange={handlingChange} type="number" className="form-control" id="age" name='age' aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={handlingChange} type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={handlingChange} type="password" name='password' className="form-control" id="exampleInputPassword1"/>
                        <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" name='ConfirmPassword' className="form-label">Confirm Password</label>
                    <input onChange={handlingChangeConfirmPassword} type="password" className="form-control" id="exampleInputPassword2"/>
                        <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>

                </div>
                
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
            <div className="col-2"></div>

            </div>
        </div>
        </>
    )
}

export default SaveUser