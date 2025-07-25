import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const signup = `${import.meta.env.VITE_SIGNUP}`;

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const { name, email, password } = credentials;
    let history = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${signup}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            // redirect to dashboard
            localStorage.setItem("token", json.token);
            history("/");
        }
        else {
            alert("Invalid credentials");
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    return (
        <div className="container my-3" style={{ color: "white" }}>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="name" type="text" value={credentials.name} placeholder="Enter Your name" onChange={onChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" value={credentials.email} placeholder="Enter email" onChange={onChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={credentials.password} placeholder="Password" onChange={onChange} minLength={8} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}
export default Signup