import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


const Login = () => {
const [credentials, setCredentials] = useState({email: "", password: ""});
let history = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_LOGIN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        // redirect to dashboard
        localStorage.setItem("token", json.token);
        history("/");
    }
    else{
        alert("Invalid credentials");
    }

}

const onChange = (e) => {
   setCredentials({...credentials, [e.target.name]: e.target.value});
};


    return (

        <div className="container my-3" style={{ color: "white" }}>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" value={credentials.email} placeholder="Enter email" onChange={onChange} />
                    <Form.Text style={{ color: "white" }}>
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={credentials.password} placeholder="Password" onChange={onChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}


export default Login;