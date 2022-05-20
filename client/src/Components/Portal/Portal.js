import React from 'react'
import './portal.css'
import { useState } from 'react';
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

const Portal = () => {
    const [username, setName] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleSubmit = (event) => {
      event.preventDefault()
      Axios.get('http://localhost:5000/usernames').then((res) => {
          res.data.forEach((elem) => {
            
            // ENTER PASSWORD
            if (elem.username === username) {
              history.push(`/contractor-portal/correct-user`, {user: username});
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
              <p>Welcome to CTA contractor portal! To continue, log in by entering your given CTA Login.</p>
              <form onSubmit={handleSubmit}>
                <label>CTA LOGIN</label>
                <input 
                  type="text" 
                  placeholder='Username'
                  onChange={(e) => setName(e.target.value)} />
                  {errorMessage && (<p className="error"> {errorMessage} </p>)}
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
          <div class="split bottom">
          </div>
        </>
      )
}

export default Portal;