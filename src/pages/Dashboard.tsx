import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export default function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [loading, setLoading] = useState(true);
  const [consentStatus, setConsentStatus] = useState<boolean | null>(null);
  const [declarationText, setDeclarationText] = useState('');

  // 1. On load: Check if this user has already declared anything
  useEffect(() => {
    async function fetchDeclaration() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('declarations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }) // Get the latest one
          .limit(1);

        if (data && data.length > 0) {
          setConsentStatus(data[0].consent_status);
          setDeclarationText(data[0].declaration_text || '');
        }
      }
      setLoading(false);
    }
    fetchDeclaration();
  }, []);

  // 2. The Logic: Saving a new declaration
  const handleDeclare = async (status: boolean) => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('declarations')
        .insert([
          { 
            user_id: user.id, 
            consent_status: status,
            declaration_text: status ? "Authorized for interaction." : "Access Denied.",
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        alert('Filing Error: ' + error.message);
      } else {
        setConsentStatus(status);
        alert(status ? 'Status Confirmed: FUCKABLE' : 'Status Confirmed: RESTRICTED');
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.clear();
    onLogout();
  };

  if (loading) return <div className="p-10 text-center">Retrieving Federal Records...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-12 border-b border-gray-300 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Department of Consent</h1>
          <p className="text-sm text-slate-500">Logged in as: {userEmail}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-red-700 hover:bg-red-50 rounded border border-red-200"
        >
          Terminante Session
        </button>
      </header>

      <main className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-6">Current Designation Status</h2>
          
          <div className={`text-4xl font-black tracking-widest mb-8 p-6 rounded-lg border-4 ${
            consentStatus === true ? 'border-green-500 text-green-700 bg-green-50' : 
            consentStatus === false ? 'border-red-500 text-red-700 bg-red-50' : 
            'border-gray-300 text-gray-400 bg-gray-50'
          }`}>
            {consentStatus === true ? 'AVAILABLE' : 
             consentStatus === false ? 'RESTRICTED' : 
             'UNDECLARED'}
          </div>

          <p className="mb-8 text-gray-600">
            Select your status for the official record. This action is logged permanently.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleDeclare(false)}
              className="flex-1 bg-red-800 hover:bg-red-900 text-white py-4 px-6 rounded-lg font-bold shadow-md transition-all"
            >
              DENY ACCESS
            </button>
            <button
              onClick={() => handleDeclare(true)}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white py-4 px-6 rounded-lg font-bold shadow-md transition-all"
            >
              GRANT ACCESS
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}