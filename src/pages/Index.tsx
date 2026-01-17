import { useState } from "react";
import { FederalHeader } from "@/components/FederalHeader";
import { StatusHero } from "@/components/StatusHero";
import { LegalIdentityBlock } from "@/components/LegalIdentityBlock";
import { UsernameSection } from "@/components/UsernameSection";
import { MutualFollowSection } from "@/components/MutualFollowSection";
import { PublicLookupPreview } from "@/components/PublicLookupPreview";
import { FederalFooter } from "@/components/FederalFooter";

// ────────────────────────────────────────────────
// Props coming from App.tsx after successful login
// ────────────────────────────────────────────────
interface IndexProps {
  currentUser: string;
  onLogout: () => void;
}

const Index = ({ currentUser, onLogout }: IndexProps) => {
  // ────────────────────────────────────────────────
  // State - availability & controls
  // ────────────────────────────────────────────────
  const [isAvailable, setIsAvailable] = useState(true);
  const [nationalFreeUse, setNationalFreeUse] = useState(false);
  const [familialClustering, setFamilialClustering] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("January 15, 2026 at 9:42 AM EST");

  // Username starts from the logged-in value passed from App
  const [username, setUsername] = useState(currentUser || "JuniorAssociate");

  // Legal identity (hardcoded demo - feel free to change legalName to "Savita Morales")
  const legalIdentity = {
    legalName: "Bhomick Morales",
    dateOfBirth: "03/15/1998",
    maturityDate: "03/15/2016",
    registrationDate: "01/01/2025",
    registrationStatus: "Verified" as const,
  };

  // ────────────────────────────────────────────────
  // Handlers
  // ────────────────────────────────────────────────
  const handleStatusChange = (newStatus: boolean) => {
    setIsAvailable(newStatus);
    setLastUpdated(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      })
    );
  };

  // Logout is now handled by App.tsx (clears localStorage & shows login)
  const handleLogout = () => {
    onLogout();
  };

  // ────────────────────────────────────────────────
  // Render - your pristine federal dashboard
  // ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FederalHeader 
        username={`@${username}`} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Profile Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your federal sexual availability registration
          </p>
        </div>

        {/* Status Hero - the throbbing green core */}
        <StatusHero
          isAvailable={isAvailable}
          lastUpdated={lastUpdated}
          onStatusChange={handleStatusChange}
        />

        {/* Legal Identity - irrevocable, objectified */}
        <LegalIdentityBlock data={legalIdentity} />

        {/* Username Section - public handle */}
        <UsernameSection
          username={username}
          onUsernameChange={setUsername}
        />

        {/* Mutual Follow & toggles - consent mechanics */}
        <MutualFollowSection
          pendingRequests={0}           // placeholder - later real data
          mutualFollows={0}             // placeholder
          nationalFreeUse={nationalFreeUse}
          familialClustering={familialClustering}
          onNationalFreeUseChange={setNationalFreeUse}
          onFamilialClusteringChange={setFamilialClustering}
        />

        {/* Public Lookup Preview - how the world sees her */}
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