import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { useContext } from 'react';
import { AppContext } from '../../context';

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                type="email"
                placeholder="email"
                {...register("email")}
                required
            />
            <input 
                type="password" 
                placeholder="password"
                {...register("password")}
                required
            />
            <button type="submit">Login</button>
            <Link to={'/register'}>Don't have an account? Register</Link>
        </form>
    )
}