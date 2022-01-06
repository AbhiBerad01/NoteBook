import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
    const {setAlert} = props
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:"",name:"",cpassword:""})
    const handleSubmit= async (e)=>{
    if(credentials.password===credentials.cpassword){

            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
            });
            const json = await response.json()
            if(json.success){
                localStorage.setItem('token',json.Auth_token)
                navigate('/')
                props.showAlert("Account created Successfully","success")
            }else{
                props.showAlert('invalid criteria',"danger")
            }
        }else{
            props.showAlert("please check password","danger")
        }
    }
    const onChange = (e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name='name' aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name='password' minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" value={credentials.cpassword} onChange={onChange} className="form-control" id="cpassword" name='cpassword'  minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}


export default Signup
