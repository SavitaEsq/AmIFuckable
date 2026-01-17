import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Your specific supabase file

interface LoginFormProps {
  onLogin: (username: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState(''); // Supabase prefers emails by default
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('ACCESS DENIED: ' + error.message);
      setLoading(false);
    } else {
      // 2. Success! The user exists.
      // We save their name in SessionStorage (Temporary RAM only)
      // This vanishes when the tab closes.
      sessionStorage.setItem('currentUser', data.user?.email || '');
      
      onLogin(data.user?.email || '');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-900">
          AmIFuckable.gov
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Secure Identity Declaration
        </p>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* FAKE FIELDS: These trick the browser into filling these instead of your real fields */}
          <input type="text" style={{display: 'none'}} autoComplete="username" />
          <input type="password" style={{display: 'none'}} autoComplete="new-password" />

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Official Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="savita@esq.gov"
              required
              autoComplete="off"
              name="random-email-field-123" // Random name confuses password managers
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Secure Passphrase
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="new-password" // Strongest hint to not autofill
              name="random-password-field-123"
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

        <p className="text-center text-sm text-gray-500 mt-6">
          Irrevocable upon submission — court order required for revocation.
        </p>
      </div>
    </div>
  );
}