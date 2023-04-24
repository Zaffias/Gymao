import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { useContext } from 'react';
import { AppContext } from '../../context';
import { Wrapper } from '../Wrapper';
import '../styles/Login.css';

export const Login = () => {
    const context = useContext(AppContext);
    
    if(context.authenticated) return <Navigate to={'home'}></Navigate>
    
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    
    
    const onSubmit = async data => {
        try {
            const response = await axiosInstance.post('/auth', data);
            const { token, userDTO } = response.data;        
            localStorage.setItem('token', token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            context.setAuthenticated(true);
            context.setUser(userDTO);
        }
         catch (error) {
            console.log(error);
        }
    };

    return(
        <Wrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='login-wrapper'>
                    <h1>Login to Your Account</h1>
                    <div className='text-input-wrapper'>
                        <label htmlFor="email" className='text-input-label'>
                            Email
                        </label>
                        <input 
                            type="email"
                            {...register("email")}
                            required
                            name='email'
                            className='form-text-input'
                            autoComplete='off'
                        />
                    </div>
                    <div className='text-input-wrapper'>
                        <label htmlFor="password" className='text-input-label'>
                            Password
                        </label>
                        <input 
                            type="password"
                            {...register("password")}
                            required
                            name='password'
                            className='form-text-input'
                        />
                    </div>
                        <button type='submit' className='login-button'>Login</button>
                        <Link to={'/register'}>Don't have an account? Register</Link>
                </div>
            </form>
        </Wrapper>
    )
}