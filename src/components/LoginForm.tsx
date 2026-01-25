import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface LoginFormProps {
  onLogin: (username: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [usernameInput, setUsernameInput] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Strip '@' and mask as federal email
    const cleanUsername = usernameInput.startsWith('@') ? usernameInput.slice(1) : usernameInput;
    const internalEmail = `${cleanUsername.toLowerCase()}@fed.registry.gov`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: internalEmail,
      password: password,
    });

    if (error) {
      alert('AUTHORIZATION DENIED: Identity not found in federal records.');
      setLoading(false);
    } else {
      sessionStorage.setItem('currentUser', cleanUsername);
      onLogin(cleanUsername);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-900">AmIFuckable.gov</h1>
        <p className="text-center text-gray-600 mb-8">Secure Identity Declaration</p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Registry Username</label>
            <input
              type="text" // FIXED: Changed from 'email' to 'text' to prevent browser validation errors
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="@ChiefJustice"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">Secure Passphrase</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
          >
            {loading ? 'Verifying Credentials...' : 'Authenticate Session'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Irrevocable upon submission.</p>
      </div>
    </div>
  );
}