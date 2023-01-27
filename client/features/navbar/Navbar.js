import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'


const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };
  // const response = ()=>{
  //   try {
  //     if (response) {
  //       let decode = jwt_decode(JSON.stringify(response), { header: true })
  //       // valid token format
  //       console.log(decode)
  //     }
  //   } catch(error) {
  //     console.error('token again')
  //   }
    
  // }
  return (
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <GoogleLogin
              clientId= '635857443662-m660ubej5a3g0046gi44j2j8afhkpau6.apps.googleusercontent.com'
              // adding google login function 
              onSuccess={(response)=> console.log(response)}
              onError={() => {
                console.log('Login Failed')
              }}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
