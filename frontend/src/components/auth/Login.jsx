import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });
    const { loading, authUser } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            dispatch(setLoading(true));
            const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (authUser?.role === 'recruiter') {
            navigate("/admin/companies");
        } else if (authUser?.role === 'student') {
            navigate("/");
        }
    }, [authUser, navigate]);

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-4 text-center'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="jobJunction@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="password"
                        />
                    </div>
                    <div className="flex flex-col my-5">
                        <RadioGroup value={input.role} onChange={(value) => setInput({ ...input, role: value })}>
                            <div className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem
                                    id="student"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="student">Students</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    id="recruiter"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? (
                            <Button className='w-full my-4'>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className='w-full my-4'>Login</Button>
                        )
                    }
                    <span className='text-sm block text-center'>Don't have an account? <Link to="/signup" className='text-blue-500 cursor-pointer underline'>Signup</Link></span>
                </form>
            </div>
        </>
    );
};

export default Login;
