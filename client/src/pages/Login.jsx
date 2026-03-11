import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userToken', data.token);

        if (data.user.role === 'admin') {
          navigate('/events');
        } else {
          navigate('/');
        }
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login Error:', err);
      toast.error('Could not connect to the server.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 pt-20">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 text-center mb-8">
          Welcome to <span className="text-red-600">LifeLine</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-red-500 transition outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-red-500 transition outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 font-medium">
          Need an account? <Link to="/register" className="text-red-600 font-bold hover:underline">Register as Donor</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;