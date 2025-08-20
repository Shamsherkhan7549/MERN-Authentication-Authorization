import React, { useContext, useState} from 'react'
import axios from 'axios';
import { userContext } from '../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [user, setUser] = useState({});
     const url = import.meta.env.VITE_API_BACKEND_URL;
    const {setToken} = useContext(userContext)
    const navigate = useNavigate()
    const handlingChange = (event) => {
        setUser(prevUser=>( {...prevUser, [event.target.name]:event.target.value}))
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const res = await axios.post(url + '/login', user)


            if(res.data.success === false){
                console.log("token not available")
                return
            }
            setToken(res.data.token)
        }catch(e){
            
            console.log(e.stack)
            console.log("error: " + e)
        }
    }

    return (
        <>
            <div className='container '>
                <div className="row">
                    <div className="col-2"></div>

                    <form onSubmit={handleSubmit} className='col-8 py-5 text-start'>
                        <h3> <u> LogIn</u></h3>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input onChange={handlingChange} type="text" className="form-control" id="username" name='username' aria-describedby="emailHelp" />
                        </div>                        
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input onChange={handlingChange} type="password" name='password' className="form-control" id="exampleInputPassword1" />
                            <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>

                        </div>
                        
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <div className="col-2"></div>

                </div>
            </div>
        </>
    )
}

export default Login