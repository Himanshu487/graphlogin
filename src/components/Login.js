import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const [inputBoxColor,setinputBoxcolor]  = useState(true);

  const validateForm = () => {
    let valid = true;
    
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'The value is required';
      valid = false;
      setinputBoxcolor(false);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
      setinputBoxcolor(false);
    }

    if (!password) {
      newErrors.password = 'The value is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Logging in...');
    } else {
      console.log('Form validation failed');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password');
    alert('link to reset your password shared on your email');
  };

  return (
    <div className='Containerform'>
      
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div>
          <p className='email'>Email Address</p>
          {/* <br/> */}
          <input
            className={!inputBoxColor ? "inputBox":" "}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 

          />
           <br/>
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div className='Container'>
          <p className='password'>Password</p>
          {/* <br/> */}
          <input
           
            className={!inputBoxColor ? "inputBox":" "}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
          <br/>
          <button className='forgetBtn' type="button" onClick={handleForgotPassword}>Forgot Password</button>
          <br/>
          <button className='logIn' type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
