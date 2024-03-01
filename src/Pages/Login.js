import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setsuccessMessage] = useState('')

  const [loginUser] = useMutation(LOGIN_USER)

  const handleFormSubmit = async (e) => {
    e.preventDefault()


    try {
      const { data } = await loginUser({ variables: { username, password } })

      if (data && data.login) {
        setsuccessMessage('login succesful')
        setErrorMessage(null)

        window.location.href = '/'
      } else {
        setErrorMessage('wrong username or password')
        setsuccessMessage(null)
      }
    } catch (error) {
      setErrorMessage('wrong username or password')
      setsuccessMessage(null)
    }
  };
  return (
    <>
      <div className='h-screen flex bg-gray-bg1'>
        <div className='w-full max-w-md m-auto bg-stone-200 rounded-xl border-2 border-slate-200 shadow-default py-10 px-16'>
          <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
            Login
          </h1>

          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id='username'
                placeholder='Your Username'
                value={username} onChange={(e) => setUsername(e.target.value)}
                autoComplete='off'
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id='password'
                placeholder='Your Password'
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='flex justify-center items-center mt-6'>
              <button
                type='submit'
                className='bg-black py-2 px-4 text-sm text-white rounded-md hover:bg-gray-700'
              >
                Login
              </button>
            </div>
          </form>

          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        </div>
      </div>
    </>
  );
};

export default Login;
