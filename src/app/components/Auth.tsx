'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setMessage('');

    if (!email || !password) {
      setMessage('❌ Please enter both email and password.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage(isLogin ? '✅ Logged in!' : '✅ Signed up! Please check your email.');

      if (isLogin) {
        // Wait a second for UI feedback, then redirect
        setTimeout(() => {
          router.push('/home');
        }, 1000);
      }

      if (!isLogin) {
        // Clear sign up form
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isLogin ? 'Log In' : 'Sign Up'}
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {!isLogin && (
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border mb-3 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isLogin ? 'Log In' : 'Sign Up'}
      </button>

      <p
        className="text-sm text-center mt-3 text-blue-600 cursor-pointer"
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage('');
        }}
      >
        {isLogin
          ? 'Need an account? Sign Up'
          : 'Already have an account? Log In'}
      </p>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}
