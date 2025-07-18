'use client';

import { sendFormData } from '@/lib/actions/others/contactAction';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const ContactUs = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const res = await sendFormData(formData);
			toast.success('Message sent successfully!');
			setFormData({ name: '', email: '', message: '' });
			// const res
		} catch (error) {
			if (isAxiosError(error)) {
				toast.error('Network Error');
			}
			// console.error('Error sending form data:', error);
			toast.error(`Error: ${error.message}`);
		}
	};

	return (
		<>
			<ToastContainer />
			<section className='bg-[#f4f4f4] py-16 px-6 md:px-12'>
				{/* Hero Section */}
				<div className='max-w-6xl mx-auto text-center'>
					<h2 className='text-4xl font-extrabold text-[#333333] mb-4'>
						Get in Touch
					</h2>
					<p className='text-lg text-[#333333] mb-12'>
						We're here to help! Feel free to reach out with any inquiries or
						ideas.
					</p>
				</div>

				{/* Contact Form */}
				<div className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300'>
					<form onSubmit={handleSubmit} className='space-y-8'>
						<div>
							<label className='block text-[#333333] text-lg font-semibold mb-2'>
								Your Name
							</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								className='w-full p-4 border border-[#d87d23] rounded-lg bg-[#f4f4f4] focus:outline-none focus:ring-2 focus:ring-[#ff6f3c] transition duration-300'
								placeholder='Enter your name'
							/>
						</div>

						<div>
							<label className='block text-[#333333] text-lg font-semibold mb-2'>
								Your Email
							</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className='w-full p-4 border border-[#d87d23] rounded-lg bg-[#f4f4f4] focus:outline-none focus:ring-2 focus:ring-[#ff6f3c] transition duration-300'
								placeholder='Enter your email'
							/>
						</div>

						<div>
							<label className='block text-[#333333] text-lg font-semibold mb-2'>
								Message
							</label>
							<textarea
								name='message'
								value={formData.message}
								onChange={handleChange}
								className='w-full p-4 border border-[#d87d23] rounded-lg bg-[#f4f4f4] focus:outline-none focus:ring-2 focus:ring-[#ff6f3c] transition duration-300'
								placeholder='Write your message'
								rows='6'
							/>
						</div>

						<button
							type='submit'
							className='w-full bg-[#ff6f3c] text-white p-4 rounded-lg font-semibold hover:bg-[#d87d23] transition duration-300 shadow-lg hover:shadow-xl'
						>
							Send Message
						</button>
					</form>
				</div>

				{/* Contact Information Section */}
				<div className='max-w-6xl mx-auto mt-16 text-center'>
					<h3 className='text-2xl font-extrabold text-[#333333] mb-'>
						Our Contact Information
					</h3>
					<p className='text-lg text-[#333333] mb-6'>
						We’d Love to Hear From You
					</p>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 '>
						<div className='text-[#333333]'>
							<h4 className='text-[#ff6f3c] font-semibold text-lg mb-2'>
								Email
							</h4>
							<p>sales@digitalflex.com</p>
						</div>
						<div className='text-[#333333]'>
							<h4 className='text-[#ff6f3c] font-semibold text-lg mb-2'>
								Phone
							</h4>
							<p>(+1) 888-818-3618</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ContactUs;
