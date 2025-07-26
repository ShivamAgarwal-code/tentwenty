'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // wait until after hydration

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="w-1/2 flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center">
          <form onSubmit={handleLogin} className="w-full max-w-md p-8">
            <h2 className="text-2xl font-semibold mb-6 text-black">Welcome Back</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-black">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-black">Remember me</span>
              </label>
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </form>
        </div>
        
        {/* Footer */}
        <div className="p-4 text-center">
          <p className="text-gray-500 text-sm">@tentwenty</p>
        </div>
      </div>

      {/* Right: Info */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center p-12">
        <h1 className="text-4xl font-bold mb-4">ticktock</h1>
        <p className="text-lg leading-relaxed">
          Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours.
          With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
        </p>
      </div>
    </div>
  );
}