import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Register = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const register = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.post('/register', { firstName, lastName, email, password });
            navigate('/')
        } catch (error) {
            console.error('Registration failed ', error);
        }
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center relative'>
            <Link
                to='/'
                className="flex items-center absolute top-10 left-10 p-2 rounded-lg text-gray-600 hover:text-gray-400 transition duration-300 border border-gray-300"
            >
                <ArrowLeft />
                <span className="ml-2">Back to Home</span>
            </Link>
            <h1 className='mb-4 text-3xl'>Welcome to Quotix!</h1>
            <h3 className='mb-4'>created by: <strong>Dmytro Mandriichuk</strong></h3>
            <form className="w-72 mx-auto bg-cyan-50 pb-10 pt-8 px-8 rounded-lg" onSubmit={register}>
                <h2 className='text-center mb-4 text-xl font-semibold'>Registration</h2>
                <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    type='text'
                    placeholder='first name'
                    className='w-full p-2 mb-4 border-2 border-cyan-500 rounded-sm outline-cyan-800'
                />
                <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    type='text'
                    placeholder='last name'
                    className='w-full p-2 mb-4 border-2 border-cyan-500 rounded-sm outline-cyan-800'
                />
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type='email'
                    placeholder='email'
                    className='w-full p-2 mb-4 border-2 border-cyan-500 rounded-sm outline-cyan-800'
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='password'
                    placeholder='password'
                    className='w-full p-2 mb-4 border-2 border-cyan-500 rounded-sm outline-cyan-800'
                />
                <button className='block w-full mb-6 bg-cyan-500 text-white p-2 hover:bg-cyan-400 transition duration-300 font-medium rounded-sm'>Register</button>
                <div className="flex justify-center text-sm font-semibold">
                    <span className="mr-1">Already have an account?</span>
                    <Link
                        to='/login'
                        className="text-cyan-500 hover:text-cyan-400"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register