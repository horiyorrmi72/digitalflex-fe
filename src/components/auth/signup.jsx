'use client';
import { api } from '@/lib/axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { signUpValidation } from '@/validations/auth.validation';

const Signup = () => {
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
	});
	const [role, setRole] = useState('user');
	const searchParams = useSearchParams();

	useEffect(() => {
		const roleFromQuery = searchParams.get('role');
		// console.log('role from query:', roleFromQuery);
		if (roleFromQuery) {
			setRole(roleFromQuery);
			// console.log('Role set to:', roleFromQuery);
		}
		// handleSubmit();
	}, [searchParams]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			signUpValidation(formData);
			const data = { ...formData };
			// console.log('submitting signup form data:', data);
			const res = await api.post(`/auth/signup?role=${role}`, data);
			if (res.status === 201) {
				toast.success('Signed up successfully!');
			}
		} catch (error) {
			if (error?.status === 409) {
				toast.error('User already exist, kindly sign in!');
			} else if (error?.status === 401) {
				console.log(error);
				toast.error('You do not have the permission to perform this action!');
			} else {
				console.error('Error signing up:', error);
				toast.error('Error signing up');
			}
		}
	};

	return (
		<div className='py-10 px-4'>
			<ToastContainer />

			<div className='w-full max-w-md mx-auto bg-white shadow-lg rounded-xl p-8'>
				<h2 className='text-3xl font-bold text-center text-[#004e89] mb-6'>
					Create Your Account
				</h2>
				<form onSubmit={handleSubmit} className='space-y-5'>
					<div>
						<label htmlFor='email' className='block font-medium text-gray-700'>
							Email Address
						</label>
						<input
							id='email'
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className='mt-2 w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
					</div>

					<div>
						<label htmlFor='name' className='block font-medium text-gray-700'>
							Preferred Name
						</label>
						<input
							id='name'
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							className='mt-2 w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='What should we call you?'
							required
						/>
					</div>

					<div>
						<label
							htmlFor='password'
							className='block font-medium text-gray-700'
						>
							Password
						</label>
						<input
							id='password'
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							className='mt-2 w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
					</div>

					<button
						type='submit'
						className='w-full bg-[#004e89] text-white py-3 rounded-md hover:bg-blue-700 font-semibold transition-transform duration-200 hover:scale-105 uppercase'
					>
						Sign Up
					</button>
				</form>

				<p className='mt-6 text-center text-sm text-gray-600'>
					Already have an account?{' '}
					<Link
						href='?tab=signin'
						className='text-[#004e89]/90 font-semibold hover:underline'
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
