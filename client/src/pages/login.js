import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios'
import "../styles/Loginpage.css";
const Login = () => {
    
        const img =
        "https://assets-global.website-files.com/64244f777752183940b98af6/642451b361e9570cd6c814a1_63d836d3a17bf828a91ff322_expense_management.png";
        const [loading, setLoading] = useState(false)
        const navigate = useNavigate()


    const submitHandler = async (values) => {

        try {
            setLoading(true)
            const {data} = await axios.post('users/login', values)
        setLoading(false)
        message.success('login success')
        localStorage.setItem('user', JSON.stringify({...data.user, password: "" }))
        navigate('/')

        } catch (error) {
            setLoading(false)
            message.error('something went wrong')

        }

    };


    useEffect(() => {
        if (localStorage.getItem('user')) {

            navigate('/')
        }
    }, [navigate]);







        return (
        <>

            <div className='login-page'>
                {loading && <Spinner />}

                <div className="row container">
                    <h1 className='title col-lg-12'>Expense Management System - MERN STACK</h1>
                    <div className="col-md-6">
                        <img src={img} alt="login-img" width={"100%"} height="100%" />
                    </div>
                    <div className="col-md-4 login-form">
                        <Form layout="vertical" onFinish={submitHandler}>
                            <h1>Login Form</h1>
                            <Form.Item label="Email" name="email">
                                <Input type="email" required />
                            </Form.Item>
                            <Form.Item label="Password" name="password">
                                <Input type="password" required />
                            </Form.Item>
                            <div className="d-flex justify-content-between">
                                <Link to="/register">
                                    Not a user ? Click here to register !
                                </Link>
                                <button className="btn">Login</button>
                            </div>
                        </Form>
                    </div>

                </div>
            </div >
        </>
        );
    };
        export default Login