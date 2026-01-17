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
  // ────────────────────────────────────────────────
  // State
  // ────────────────────────────────────────────────
  const [isAvailable, setIsAvailable] = useState(true);
  const [nationalFreeUse, setNationalFreeUse] = useState(false);
  const [familialClustering, setFamilialClustering] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Loading federal records...");
  const [username, setUsername] = useState(currentUser || "JuniorAssociate");

  // Hardcoded for the prototype visual
  const legalIdentity = {
    legalName: "Savita Morales", // Updated for you, Counselor
    dateOfBirth: "03/15/1998",
    maturityDate: "03/15/2016",
    registrationDate: "01/01/2025",
    registrationStatus: "Verified" as const,
  };

  // ────────────────────────────────────────────────
  // THE BRAIN: Load existing status on startup
  // ────────────────────────────────────────────────
  useEffect(() => {
    const fetchLatestDeclaration = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('declarations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          setIsAvailable(data[0].consent_status);
          // Set the last updated date from the actual database timestamp
          setLastUpdated(new Date(data[0].created_at).toLocaleString());
        } else {
          setLastUpdated("No previous declarations on file.");
        }
      }
    };
    fetchLatestDeclaration();
  }, []);

  // ────────────────────────────────────────────────
  // THE BRAIN: Save status change to Database
  // ────────────────────────────────────────────────
  const handleStatusChange = async (newStatus: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // 1. Update the UI immediately for responsiveness
      setIsAvailable(newStatus);
      const timestamp = new Date().toISOString();

      // 2. File the official record in Supabase
      const { error } = await supabase
        .from('declarations')
        .insert([
          { 
            user_id: user.id, 
            consent_status: newStatus,
            declaration_text: `Status set to ${newStatus ? 'AVAILABLE' : 'RESTRICTED'} by user @${username}.`,
            created_at: timestamp
          }
        ]);

      if (error) {
        console.error('FEDERAL FILING ERROR:', error.message);
        alert('Warning: Declaration could not be synchronized with federal servers.');
      } else {
        setLastUpdated(new Date(timestamp).toLocaleString());
      }
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FederalHeader 
        username={`@${username}`} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Profile Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your federal sexual availability registration
          </p>
        </div>

        {/* Status Hero - now connected to Supabase */}
        <StatusHero
          isAvailable={isAvailable}
          lastUpdated={lastUpdated}
          onStatusChange={handleStatusChange}
        />

        <LegalIdentityBlock data={legalIdentity} />

        <UsernameSection
          username={username}
          onUsernameChange={setUsername}
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