import React from 'react';
import { useState } from 'react';
import { loginUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser(form);
    if (res.message === 'Login successful') {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-semibold text-center">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input className="input" name="email" placeholder="Email" onChange={handleChange} />
      <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit" className="btn">Login</button>
    </form>
  );
};

export default LoginForm;
