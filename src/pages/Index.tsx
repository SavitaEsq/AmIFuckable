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
  // State for Consent Status
  const [isAvailable, setIsAvailable] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("Loading federal records...");
  
  // State for Dynamic Identity
  const [username, setUsername] = useState(currentUser);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [legalIdentity, setLegalIdentity] = useState({
    legalName: "Fetching Identity...",
    dateOfBirth: "--/--/----",
    registrationDate: "--/--/----",
    registrationStatus: "Verifying" as const,
  });

  // State for Social/Clustering
  const [nationalFreeUse, setNationalFreeUse] = useState(false);
  const [familialClustering, setFamilialClustering] = useState(false);

  // ────────────────────────────────────────────────
  // THE BRAIN: Load ALL user data on startup
  // ────────────────────────────────────────────────
  useEffect(() => {
    const loadFullFederalRecord = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 1. Fetch the unique Legal Identity (Profiles Table)
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          setLegalIdentity({
            legalName: profile.legal_name,
            dateOfBirth: new Date(profile.date_of_birth).toLocaleDateString(),
            registrationDate: new Date(profile.registration_date).toLocaleDateString(),
            registrationStatus: "Verified" as const,
          });
          setUsername(profile.username);
          setAvatarUrl(profile.avatar_url);
        }

        // 2. Fetch the latest sexual availability declaration
        const { data: declarations } = await supabase
          .from('declarations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (declarations && declarations.length > 0) {
          setIsAvailable(declarations[0].consent_status);
          setLastUpdated(new Date(declarations[0].created_at).toLocaleString());
        } else {
          setLastUpdated("No previous declarations on file.");
        }
      }
    };
    loadFullFederalRecord();
  }, [currentUser]);

  // ────────────────────────────────────────────────
  // THE BRAIN: File a New Declaration
  // ────────────────────────────────────────────────
  const handleStatusChange = async (newStatus: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      setIsAvailable(newStatus);
      const timestamp = new Date().toISOString();

      const { error } = await supabase
        .from('declarations')
        .insert([
          { 
            user_id: user.id, 
            consent_status: newStatus,
            declaration_text: `Status set to ${newStatus ? 'AVAILABLE' : 'RESTRICTED'} by subject @${username}.`,
            created_at: timestamp
          }
        ]);

      if (error) {
        alert('FEDERAL FILING ERROR: Synchronization failed.');
      } else {
        setLastUpdated(new Date(timestamp).toLocaleString());
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FederalHeader 
        username={`@${username}`} 
        avatarUrl={avatarUrl} // Pass the DiceBear avatar to the header
        onLogout={onLogout} 
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4 mb-8">
           {avatarUrl && (
             <img src={avatarUrl} alt="Subject Face Scan" className="w-16 h-16 rounded-full border-2 border-primary shadow-md" />
           )}
           <div>
             <h1 className="text-2xl md:text-3xl font-bold text-primary">Registry Dashboard</h1>
             <p className="text-muted-foreground">Official Identity Management</p>
           </div>
        </div>

        <StatusHero
          isAvailable={isAvailable}
          lastUpdated={lastUpdated}
          onStatusChange={handleStatusChange}
        />

        <LegalIdentityBlock data={legalIdentity} />

        <UsernameSection
          username={username}
          onUsernameChange={setUsername} // For visual updates
        />

        <MutualFollowSection
          pendingRequests={0}
          mutualFollows={0}
          nationalFreeUse={nationalFreeUse}
          familialClustering={familialClustering}
          onNationalFreeUseChange={setNationalFreeUse}
          onFamilialClusteringChange={setFamilialClustering}
        />

        <PublicLookupPreview
          legalName={legalIdentity.legalName}
          username={username}
          isAvailable={isAvailable}
        />
      </main>

      <FederalFooter />
    </div>
  );
};

export default Index;