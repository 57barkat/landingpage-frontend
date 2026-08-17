import React, { useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            setSubmitted(true);
            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            // Clear success message after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        }
    };

    return (
        <div id='contact' className='container mx-auto'>
            <div className='lg:flex lg:px-32 gap-x-10 '>
                <div className=' flex-grow'>
                    <section className="w-full bg-gradient-to-l  from-[#110D2E]/30  to-[#fc466a4a]/10  rounded-md shadow-md  p-16">
                        <div className='flex flex-col mb-10 justify-center items-center'>
                            <h2 className="text-2xl font-semibold  capitalize text-white">Drop Us Your Message</h2>
                            <p className='text-gray-400 '>Freely contact with us anytime. We're available here for you.</p>
                        </div>

                        {submitted && (
                            <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/50">
                                <p className="text-green-400 font-medium">✓ Message sent successfully! We'll get back to you soon.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
                                <div className='col-span-2 lg:col-span-1'>
                                    <input 
                                        id="name" 
                                        name="name"
                                        type="text" 
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 mt-2 text-blue-600 rounded-full bg-transparent focus:outline-none focus:ring-0 transition-all ${
                                            errors.name ? 'formBorder-gradient-error border-red-500' : 'formBorder-gradient'
                                        }`}
                                        placeholder='Full Name' 
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                                </div>

                                <div className='col-span-2 lg:col-span-1'>
                                    <input 
                                        id="email" 
                                        name="email"
                                        type="email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 mt-2 text-blue-600 rounded-full bg-transparent focus:outline-none focus:ring-0 transition-all ${
                                            errors.email ? 'formBorder-gradient-error border-red-500' : 'formBorder-gradient'
                                        }`}
                                        placeholder='Your Email' 
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                                </div>

                                <div className='col-span-2'>
                                    <input 
                                        id="subject" 
                                        name="subject"
                                        type="text" 
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 mt-2 text-blue-600 rounded-full bg-transparent focus:outline-none focus:ring-0 transition-all ${
                                            errors.subject ? 'formBorder-gradient-error border-red-500' : 'formBorder-gradient'
                                        }`}
                                        placeholder='Select Subject' 
                                    />
                                    {errors.subject && <p className="text-red-500 text-sm mt-2">{errors.subject}</p>}
                                </div>
                                <div className='col-span-2 '>
                                    <textarea 
                                        id="message" 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-6 py-2 mt-2 text-blue-600 rounded-full bg-transparent focus:outline-none focus:ring-0 transition-all ${
                                            errors.message ? 'formBorder-gradient-error border-red-500' : 'formBorder-gradient'
                                        }`}
                                        placeholder='Message...' 
                                        rows={5} 
                                    />
                                    {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                                </div>
                            </div>

                            <div className="flex justify-start mt-6">
                                <button 
                                    type="submit"
                                    disabled={Object.keys(errors).length > 0}
                                    className="px-6 py-2 rounded-full bg-[#6318F1] text-white hover:shadow-lg hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:scale-105 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    Send Messages
                                </button>
                            </div>
                        </form>
                    </section>
                </div>


                <div className='  lg:w-[22%] flex flex-col items-center justify-center mx-16 formBorder-gradient border'>

                    <div className='flex flex-1 flex-col items-center justify-around '>      
                      <div className='flex flex-col justify-center items-center py-4'>
                      <FaPhoneAlt size={44} className='text-blue-700 my-4'/>
                        <div className='text-white text-lg py-1'>Phone</div>
                        <div className='text-gray-400 text-lg'>0310 - 7756294</div>
                      </div>
                        <hr className='w-32 align-bottom bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB] '/>
                    </div>

                   
                    <div className='flex flex-1 flex-col items-center justify-around '>      
                      <div className='flex flex-col justify-center items-center py-4'>
                      <MdMarkEmailUnread size={44} className='text-blue-700 my-4'/>
                        <div className='text-white text-lg py-1'>Email</div>
                        <div className='text-gray-400 text-lg'>0310 - 7756294</div>
                      </div>
                        <hr className='w-32 align-bottom bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB] '/>
                    </div>

                    
                    <div className='flex flex-1 flex-col items-center justify-around '>      
                      <div className='flex flex-col justify-center items-center py-4'>
                      <FaLocationDot size={44} className='text-blue-700 my-4'/>
                        <div className='text-white text-lg py-1'>Location</div>
                        <div className='text-gray-400 text-lg'>0310 - 7756294</div>
                      </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ContactUs