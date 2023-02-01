import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
const Google = () => {
    // const getOrCreateUser =  async(response)=>{
    //     try {
    //         const res = await axios.post(
    //             'http://localhost:8080/auth/google',
    //             JSON.stringify({response}),
    //             {
    //                 headers: {'content-Type': 'application/json'},
    //                 withCredentials:true
    //             }
    //         )
    //         return res
    //     } catch (error) {
    //         return error
    //     }
        // window.open('http://localhost:8080/auth/google/callback')
        // try {
        //   if (response) {
        //     let decode = jwt_decode(response.credential)
    
        //     // const {family_name, given_name, email, picture} = response.credential;
        //     //taking name from google API call and creating a user if they do not exist
        //     // valid token format
        //     return decode
        //   }
        // } catch(error) {
        //   console.error('check the response function ')
        // }
        
    //   }
  return (
    <div>
        <div>
        <h1> Google Login </h1>
        Click here to authenticate with Google
        <div className="card-action">
            <a href="/auth/google/callback">
                Google+
            </a>
        </div>
        {/* <form action="/google" method="GET">
            <GoogleLogin/>
        <button type="submit"> GOOGLE </button>
        </form> */}
        {/* <GoogleLogin
            clientId= '635857443662-m660ubej5a3g0046gi44j2j8afhkpau6.apps.googleusercontent.com'
            // adding google login function 
            onSuccess={getOrCreateUser}
            onError={() => {
            console.log('Login Failed')
            }}
            cookiePolicy={'single_host_origin'}
        /> */}

        </div>
    </div>
  );
  
}

export default Google