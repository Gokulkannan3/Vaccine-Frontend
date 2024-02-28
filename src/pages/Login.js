import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Lnav";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
    const [usermail, setUsermail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginStatus, setLoginStatus]=useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log({ usermail, password });
        try {
            const response = await axios.post('https://vaccine-server-tj0x.onrender.com/login', {
                usermail: usermail,
                password: password,
            });
            if (!response.data.auth) {
                setLoginStatus(false);
            } else {
                setLoginStatus(true);
                const { token, result } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("userData", JSON.stringify(result));
                navigate('/home');
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error.message);
            setError('Invalid Credentials');
        }
    };
    

    const userauth = () => {
        axios.get("https://vaccine-server-tj0x.onrender.com/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error('An unexpected error occurred:', error.message);
        });
    };    
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center text-3xl translate-y-32 font-bold'>
            <p>User Login</p>
        </div>
        <div className='flex justify-center'>
            <div>
                <div className='for w-96 h-96 flex justify-center bg-zinc-500 rounded-2xl align-middle mt-52'>
                    <form>
                        <p className='text-white text-2xl mb-2 mt-6'>Enter mailid</p>
                        <input
                            type='email'
                            onChange={(e) => setUsermail(e.target.value)}
                            className='bg-red-500 h-10 w-64 font-bold text-white text-center rounded-md'
                            placeholder='mail id'
                        ></input>

                        <p className='text-white text-2xl mt-6 mb-2'>Enter Password</p>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-red-500 h-10 w-64 font-bold text-white text-center rounded-md'
                            placeholder='password'
                        ></input>
                        <button
                            type="button"
                            className="-ml-12 font-semibold focus:outline-none text-white"
                            onClick={handleTogglePasswordVisibility}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                        <hr></hr>
                        {error && <p className='text-red-500 mt-2'>{error}</p>}
                        <button
                            type='submit'
                            className='text-white font-bold text-xl h-12 w-20 rounded-lg bg-red-500 hover:bg-red-400 hover:text-black mt-10 translate-x-20'
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <p className='con text-white flex justify-center mt-5 gap-2 text-xl mb-2'>
                            New user??<Link to='/signup' className='text-sky-400'>
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        {loginStatus && (
            <button onClick={userauth}>Check</button>
        )}
    </div>
  )
}
