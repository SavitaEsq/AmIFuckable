import { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && password.trim()) {
      localStorage.setItem('currentUser', name.trim());
      onLogin(name.trim());
    } else {
      alert('Both fields required, Counselor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-900">
          AmIFuckable.gov
        </h1>
        <p className="text-center text-gray-600 mb-8">
          U.S. Department of Health and Human Services  
          Secure Identity Declaration
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Name / Legal Full Name / Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Savita Morales or @JuniorAssociate"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
          >
            Submit Declaration & Access
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Irrevocable upon submission — court order required for revocation.
        </p>
      </div>
    </div>
  );
}