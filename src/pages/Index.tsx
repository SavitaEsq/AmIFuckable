import { useState } from "react";
import { FederalHeader } from "@/components/FederalHeader";
import { StatusHero } from "@/components/StatusHero";
import { LegalIdentityBlock } from "@/components/LegalIdentityBlock";
import { UsernameSection } from "@/components/UsernameSection";
import { MutualFollowSection } from "@/components/MutualFollowSection";
import { PublicLookupPreview } from "@/components/PublicLookupPreview";
import { FederalFooter } from "@/components/FederalFooter";

const Index = () => {
  // Demo user state
  const [isAvailable, setIsAvailable] = useState(true);
  const [username, setUsername] = useState("JuniorAssociate");
  const [nationalFreeUse, setNationalFreeUse] = useState(false);
  const [familialClustering, setFamilialClustering] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("January 15, 2026 at 9:42 AM EST");

  const legalIdentity = {
    legalName: "Bhomick Morales",
    dateOfBirth: "03/15/1998",
    maturityDate: "03/15/2016",
    registrationDate: "01/01/2025",
    registrationStatus: "Verified" as const,
  };

  const handleStatusChange = (newStatus: boolean) => {
    setIsAvailable(newStatus);
    setLastUpdated(new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }));
  };

  const handleLogout = () => {
    // Demo logout - would redirect to login page
    alert("Logout functionality would redirect to login page.");
  };

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

        {/* Status Hero */}
        <StatusHero
          isAvailable={isAvailable}
          lastUpdated={lastUpdated}
          onStatusChange={handleStatusChange}
        />

        {/* Legal Identity */}
        <LegalIdentityBlock data={legalIdentity} />

        {/* Username Section */}
        <UsernameSection
          username={username}
          onUsernameChange={setUsername}
        />

        {/* Mutual Follow Section */}
        <MutualFollowSection
          pendingRequests={0}
          mutualFollows={0}
          nationalFreeUse={nationalFreeUse}
          familialClustering={familialClustering}
          onNationalFreeUseChange={setNationalFreeUse}
          onFamilialClusteringChange={setFamilialClustering}
        />

        {/* Public Lookup Preview */}
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
