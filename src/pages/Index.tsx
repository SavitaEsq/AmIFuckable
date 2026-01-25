import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { FederalHeader } from "@/components/FederalHeader";
import { StatusHero } from "@/components/StatusHero";
import { LegalIdentityBlock } from "@/components/LegalIdentityBlock";
import { UsernameSection } from "@/components/UsernameSection";
import { MutualFollowSection } from "@/components/MutualFollowSection";
import { PublicLookupPreview } from "@/components/PublicLookupPreview";
import { FederalFooter } from "@/components/FederalFooter";

interface IndexProps {
  currentUser: string;
  onLogout: () => void;
}

const Index = ({ currentUser, onLogout }: IndexProps) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("Loading...");
  const [username, setUsername] = useState(currentUser);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [legalIdentity, setLegalIdentity] = useState({
    legalName: "Loading...",
    dateOfBirth: "",
    registrationDate: "",
    registrationStatus: "Verified" as const,
  });

  useEffect(() => {
    const loadFederalRecord = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch Dynamic Profile Data
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (profile) {
        setLegalIdentity({
          legalName: profile.legal_name,
          dateOfBirth: profile.date_of_birth,
          registrationDate: profile.registration_date,
          registrationStatus: "Verified" as const,
        });
        setUsername(profile.username);
        setAvatarUrl(profile.avatar_url);
      }

      // 2. Fetch Latest Status Declaration
      const { data: decs } = await supabase.from('declarations').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1);
      if (decs?.[0]) {
        setIsAvailable(decs[0].consent_status);
        setLastUpdated(new Date(decs[0].created_at).toLocaleString());
      }
    };
    loadFullFederalRecord();
  }, []);

  const handleStatusChange = async (newStatus: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setIsAvailable(newStatus);
    const timestamp = new Date().toISOString();
    await supabase.from('declarations').insert([{ 
      user_id: user.id, 
      consent_status: newStatus,
      declaration_text: `Status updated by subject @${username}.`,
      created_at: timestamp
    }]);
    setLastUpdated(new Date(timestamp).toLocaleString());
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FederalHeader username={`@${username}`} onLogout={onLogout} />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4 mb-8">
           {avatarUrl && <img src={avatarUrl} alt="Scan" className="w-16 h-16 rounded-full border-2 border-primary shadow-sm" />}
           <h1 className="text-2xl font-bold text-primary">Registry Dashboard</h1>
        </div>

        <StatusHero isAvailable={isAvailable} lastUpdated={lastUpdated} onStatusChange={handleStatusChange} />
        <LegalIdentityBlock data={legalIdentity} />
        <UsernameSection username={username} onUsernameChange={setUsername} />
        <MutualFollowSection pendingRequests={0} mutualFollows={0} nationalFreeUse={false} familialClustering={false} onNationalFreeUseChange={()=>{}} onFamilialClusteringChange={()=>{}} />
        <PublicLookupPreview legalName={legalIdentity.legalName} username={username} isAvailable={isAvailable} />
      </main>
      <FederalFooter />
    </div>
  );
};

export default Index;