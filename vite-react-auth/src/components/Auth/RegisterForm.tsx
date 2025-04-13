import React, { useState } from 'react';
import { registerUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await registerUser(form);
    if (res.message === 'Registration successful!') {
      navigate('/');
    } else {
      setError(res.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-semibold text-center">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input className="input" name="name" placeholder="Full Name" onChange={handleChange} />
      <input className="input" name="email" placeholder="Email" onChange={handleChange} />
      <input className="input" name="phone" placeholder="Phone Number" onChange={handleChange} />
      <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit" className="btn">Register</button>
    </form>
  );
};

export default RegisterForm;
