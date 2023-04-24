import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { useContext, useState } from 'react';
import { AppContext } from '../../context';
import { Wrapper } from '../Wrapper';
import '../styles/Login.css';
import { Logo } from '../utils/Logo';
import { AuthFormTextInput } from './loginComponents/AuthFormTextInput';

export const Register = () => {
    const context = useContext(AppContext);
    
    if(context.authenticated) return <Navigate to={'home'}></Navigate>
    
    const [registered, useRegistered] = useState(false);
    
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
            password2: '',
            userName: '',
        }
    });
    
    const onSubmit = async data => {
        try {
            if(register.password === register.password2){
                const response = await axiosInstance.post('/user', data);
                useRegistered(true);
            }else{
                console.log('passwords must be the same');
            }
        }
         catch (error) {
            console.log(error);
        }
    };

    return(
        <Wrapper>
            {registered && <Navigate to={'login'}/>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='login-wrapper'>
                    <Logo className='login-logo'/>
                    <h2 className='login-title'>Create an account</h2>
                                        
                    <AuthFormTextInput
                        htmlFor="name"
                        label="Your name"
                        type="text"
                        autoComplete='off'
                        register={register}
                        name={'userName'}
                        required={true}
                    />
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
                    <AuthFormTextInput
                        htmlFor="password2"
                        label="Confirm password"
                        type="password"
                        register={register}
                        name={'password2'}
                        required={true}
                    />
                    <button type='submit' className='login-button'>Sign Up</button>
                    <Link to={'/login'}>Already have an account? Login</Link>
                </div>
            </form>
            <div className='login-background-image'>
            </div>
        </Wrapper>
    )
}