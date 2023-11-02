import React, { useState } from 'react'
import { Fields } from '../constant/Users'
import './LogInForm.css'
import {useDispatch} from 'react-redux'
const InitialData = {
    name: "",
    email: "",
    contact: "",
    city: "",
    gender: "",
    terms: false,
  };
const LogInForm = () => {
    const [state, setState] = useState(InitialData);
    const dispatch = useDispatch();
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === "checkbox" ? checked : value;
        setState({
          ...state,
          [name]: fieldValue,
        });
        console.log(state);
      };
    
   const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch((state))
    setState(InitialData);

   };
     
  return (
    <div className='login'>
    <div>
      <form className="form" onSubmit={handleSubmit}>
       
        {
          Fields.map((field)=>{
            if(field.type==='text' || field.type==='email' || field.type==='tel'){
              return(
                <label>
                  {field.title}
                  <input
                    className={field.class}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={state[field.name]}
                    onChange={handleChange}
                  
                  />
                  
                </label>
              )
            } 
            else if(field.type === 'select'){
              return(
                <label>
                  {field.title}
                  
                    <select
                      className={field.class}
                      type={field.type}
                      name={field.name}
                      value={state[field.name]}
                      onChange={handleChange}
                    >
                    {
                      field.Option.map((option)=>(
                        <option>{option.label}</option>
                      ))
                    }
                    </select>
                 
                </label>
              )
            }
            
            else if(field.type === 'radio'){
              return(
                <label>
                  {field.title}
                  {field.Option.map((option)=>(
                    <label>
                    <input
                    type={field.type}
                    name={field.name}
                    value={option.value}
                    onChange={handleChange}
                    checked={state[field.name] === option.value}
                  />
                    {option.label}
                    </label>
                  ))}
                 
                </label>
              )
            }
            else if(field.type === 'checkbox'){
              return(
                <label>
                  {field.title}
                
                    <input
                      type={field.type}
                      name={field.name}
                      checked={state[field.name]}
                      onChange={handleChange}
                    />
                  
                
                </label>
              )
            }
          })
        }
  <button type='submit' value='submit'>Submit</button>
      </form>
    </div>
    
  </div>
  )
}

export default LogInForm