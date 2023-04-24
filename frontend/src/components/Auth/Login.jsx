import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { useContext } from 'react';
import { AppContext } from '../../context';
import { Wrapper } from '../Wrapper';
import '../styles/Login.css';
import { Logo } from '../utils/Logo';
import { AuthFormTextInput } from './loginComponents/AuthFormTextInput';

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
                    <Logo className='login-logo'/>
                    <h2 className='login-title'>Login to Your Account</h2>
                    <AuthFormTextInput
                        htmlFor="email"
                        label="Email"
                        type="email"
                        autoComplete='off'
                        register={register}
                        name={'email'}
                        required={true}
                    />
                    <AuthFormTextInput
                        htmlFor="password"
                        label="Password"
                        type="password"
                        register={register}
                        name={'password'}
                        required={true}
                    />
                    <button type='submit' className='login-button'>Login</button>
                    <Link to={'/register'}>Don't have an account? Register</Link>
                </div>
            </form>
            <div className='login-background-image'>
            </div>
        </Wrapper>
    )
}