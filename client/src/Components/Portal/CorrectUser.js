import React from 'react'
import './portal.css'
import { useState } from 'react';
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const CorrectUser = () => {
    const history = useHistory();
    const location = useLocation();
    const [username, setName] = useState(`${location.state.user}`)
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (event) => {
      event.preventDefault()
      Axios.get('http://localhost:5000/usernames').then((res) => {
          res.data.forEach((elem) => { 
            // ENTER PASSWORD
            if (elem.username === username) {
              console.log("asdf")
              // Axios.post('http://localhost:5000/username/password', {username: username}).then((res) => {
              //   console.log(res.data[0].password)
              // })
            }
            // USER NOT FOUND
            else {
              setErrorMessage('User is not found in contractor database');
            }       
          })
      })
    }

    return (
        <>
          <div class="split top">
          </div>
          <div class="box">
            <div class="loginbox">
              <p>Gain access to the CTA contractor portal by logging in with your password.</p>
              <form onSubmit={handleSubmit}>
                <label>CTA LOGIN</label>
                <input 
                  type="text" 
                  value = {username}
                  onChange={(e) => setName(e.target.value)} />
                {errorMessage && (<p className="error"> {errorMessage} </p>)}
                <label>PASSWORD</label>
                <input 
                  type="password" 
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
          <div class="split bottom">
          </div>
        </>
      )
}
export default CorrectUser;