import React, { useState } from "react";
import { Fields } from "../../constant/Users";
import { Form, Input, Select, Radio, Checkbox, Button } from "antd";
import { addUser } from "../../store/UserSlice";
import { useDispatch, useSelector } from 'react-redux';
import apiCaller from "../../services/api/API";

const InitialData = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  city: "",
  gender: "",
  terms: false,
};

const CreateUser = () => {
  const dispatch = useDispatch();
  const myUsers = useSelector((state) => state.userDetails.users);
  const [state, setState] = useState(InitialData);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setState({
      ...state,
      [name]: fieldValue,
    });
    console.log(state);
  };

  const handleSubmit = async () => {
    console.log('state', state);
    try{
      const res = await apiCaller({method : 'post', url:'users', data: state});
     // const res =  await axios.post('/users', state);
      console.log('response',res.data);
      dispatch(addUser(res.data));
    setState(InitialData);
    }catch(error){
      console.log('error',error);
    }
    
  };

  return (
    <div>
      <h1 className="h1">Add New User Here</h1>
      <div className="form">
        <Form onFinish={handleSubmit}>
          {Fields.map((field) => {
            if (field.type === "text" || field.type === "email" || field.type === 'tel') {
              return (
                <Form.Item key={field.name}>
                  <label>{field.title}</label>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={state[field.name]}
                    onChange={handleChange}
                    required
                    
                  />
                </Form.Item>
              );
            }
            else if (field.type === "Select") {
              return (
                
                <Form.Item key={field.name}>
                  <label>{field.title}</label>
                  <Select
                    type={field.type}
                    name={field.name}
                    value={state[field.name]}
                    onChange={(value) => handleChange({ 
                      target: { name: field.name, value } })}
                      required
                  >
                    {field.Option.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                
              );
            }
            else if (field.type === 'Radio') {
              return (
                <Form.Item key={field.name} label={field.title}>
                  <Radio.Group
                    type={field.type}
                    name={field.name}
                    value={state[field.name]}
                    onChange={handleChange}
                    required
                  >
                    {
                      field.Option.map((option) => (
                        <Radio key={option.value} value={option.value}>
                          {option.label}
                        </Radio>
                      ))
                    }
                  </Radio.Group>
                </Form.Item>
              )
            }
            else if (field.type === 'checkbox') {
              return (
                <Form.Item key={field.name} label={field.title}>
                  <Checkbox
                    type={field.type}
                    name={field.name}
                    checked={state[field.name]}
                    onChange={handleChange}
                  />
                </Form.Item>
              )
            }
            return null; // Add this to handle cases where the field type is not recognized
          })}
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Post
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
};

export default CreateUser;
