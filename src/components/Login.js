import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:""})
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json()
        if(json.success){
            localStorage.setItem('token',json.Auth_token)
            navigate('/')
            props.showAlert("Logged in successfully","success")
        }else{
            props.showAlert("Invalid Criteria","danger")
        }
    }
    const onChange = (e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name='password' minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
