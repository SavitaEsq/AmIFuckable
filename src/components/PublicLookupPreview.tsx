import { useState } from "react";
import { Search, CheckCircle, Eye } from "lucide-react";

interface PublicLookupPreviewProps {
  legalName: string;
  username: string;
  isAvailable: boolean;
}

export function PublicLookupPreview({ legalName, username, isAvailable }: PublicLookupPreviewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    if (searchQuery.toLowerCase().includes(legalName.toLowerCase().split(" ")[0])) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };

  return (
    <section className="section-card">
      <div className="section-header flex items-center gap-2">
        <Eye className="w-4 h-4" />
        Public Lookup Preview
      </div>
      
      <div className="section-body">
        <p className="text-sm text-muted-foreground mb-4">
          See how your profile appears to other registered users searching the National Registry.
        </p>

        {/* Simulated search */}
        <div className="p-4 bg-accent/30 rounded-sm border border-border">
          <p className="data-label mb-2">National Registry Search</p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResult(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter legal name to search..."
                className="federal-input pl-10"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="federal-button"
            >
              Search
            </button>
          </div>

          {/* Search result */}
          {showResult && (
            <div className="mt-4 p-4 bg-card border border-border rounded-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{legalName}</span>
                    <span className="verified-badge">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">@{username}</p>
                </div>
                <div className={isAvailable ? 'status-badge-available text-xs' : 'status-badge-unavailable text-xs'}>
                  {isAvailable ? 'FUCKABLE' : 'UNFUCKABLE'}
                </div>
              </div>
            </div>
          )}

          {searchQuery && !showResult && (
            <p className="mt-4 text-sm text-muted-foreground text-center py-4">
              No results found. Try searching for your own legal name to preview.
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Note: This preview shows how your public profile appears. Your legal name is the primary 
          search key; username is displayed for mutual follow identification.
        </p>
      </div>
    </section>
  );
}
