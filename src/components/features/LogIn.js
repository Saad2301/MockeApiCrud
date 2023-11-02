import React, { useState } from 'react'
import { Button, Divider, Form, Input, Typography } from 'antd'
import './LogInForm.css'
import { FacebookOutlined, GoogleOutlined, TwitterOutlined } from '@ant-design/icons'
//import userData from './db.json'
import userData from '../../dbJson/db.json'
import { useNavigate } from 'react-router-dom';
const initialValues = {email:'', password:''}
const LogIn = () => {
    const navigate = useNavigate();
    const [state, setState]  = useState(initialValues);
    const handleChange=(event)=>{
        const {name , value} = event.target;
        setState({
            ...state,
            [name] : value
        })
    }
    const handleSubmit=()=>{
        console.log(userData);
        const user = userData.users;
        const findUser = user.find((el)=>
        el.email === state.email && el.password === state.password
        );
        console.log('user exist :',findUser);
         if(findUser){
            localStorage.setItem('users',JSON.stringify(findUser))
            navigate('/dashboard');
         }
    }
  return (
    <div className='bgApp'>
        <Form className='loginform' onFinish={handleSubmit}>
            <Typography.Title>LogIn Your Account</Typography.Title>
            <Form.Item >
                <label>Email
                <Input
                    type='email'
                    placeholder='Enter your email here'
                    value={state.email}
                    name='email'
                    onChange={handleChange}
                />
                </label>
            </Form.Item>
            <Form.Item>
                <label>Password
                <Input.Password
                 value={state.password}
                 name='password'
                placeholder='Enter your password here'
                onChange={handleChange}
                />
                </label>
            </Form.Item>
            <Button type='primary' htmlType='submit' block>Login</Button>
            <Divider style={{borderColor:'black'}}>or login with</Divider>
            <div className='socialIcons'>
                <GoogleOutlined style={{color:'red'}}/>
                <FacebookOutlined style={{color:'blue'}}/>
                <TwitterOutlined/>
            </div>
        </Form>
       
        </div>
  )
}

export default LogIn