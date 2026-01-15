import { useState } from "react";
import { Users, Bell, Globe, Home, ChevronRight, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MutualFollowSectionProps {
  pendingRequests: number;
  mutualFollows: number;
  nationalFreeUse: boolean;
  familialClustering: boolean;
  onNationalFreeUseChange: (value: boolean) => void;
  onFamilialClusteringChange: (value: boolean) => void;
}

export function MutualFollowSection({
  pendingRequests,
  mutualFollows,
  nationalFreeUse,
  familialClustering,
  onNationalFreeUseChange,
  onFamilialClusteringChange,
}: MutualFollowSectionProps) {
  const [showFreeUseWarning, setShowFreeUseWarning] = useState(false);

  const handleFreeUseToggle = (checked: boolean) => {
    if (checked) {
      setShowFreeUseWarning(true);
    } else {
      onNationalFreeUseChange(false);
    }
  };

  return (
    <section className="section-card">
      <div className="section-header flex items-center gap-2">
        <Users className="w-4 h-4" />
        Mutual Follow Consent Protocol
      </div>
      
      <div className="section-body space-y-6">
        {/* Explanation */}
        <div className="p-4 bg-accent/30 rounded-sm border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            If another registered user follows you and you approve their follow request, 
            mutual consent is established pursuant to Section 5(a). This grants ongoing 
            access until revoked by either party. Revocation sends mandatory real-time 
            notifications to all current mutual follows per Section 5(d).
          </p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <button className="federal-button-secondary justify-between group">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>Pending Follow Requests</span>
                </div>
                <div className="flex items-center gap-2">
                  {pendingRequests > 0 && (
                    <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                      {pendingRequests}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Pending Follow Requests</DialogTitle>
                <DialogDescription>
                  Review and approve or deny incoming consent requests.
                </DialogDescription>
              </DialogHeader>
              <div className="py-8 text-center text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No pending requests at this time.</p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="federal-button-secondary justify-between group">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>My Mutual Follows</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">{mutualFollows}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Current Mutual Follows</DialogTitle>
                <DialogDescription>
                  Users with whom you have established mutual consent.
                </DialogDescription>
              </DialogHeader>
              <div className="py-8 text-center text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No mutual follows established yet.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Toggle switches */}
        <div className="space-y-4 pt-4 border-t border-border">
          {/* National Free-Use Toggle */}
          <div className="flex items-start justify-between gap-4 p-4 bg-secondary/50 rounded-sm">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h4 className="font-medium text-foreground cursor-help">
                      National Free-Use Toggle
                    </h4>
                  </TooltipTrigger>
                  <TooltipContent className="federal-tooltip max-w-sm">
                    <p>Per Section 5(e), enabling this toggle grants blanket consent to all 
                    registered users nationwide without requiring individual follow approval. 
                    Revocable at any time with immediate effect.</p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-xs text-muted-foreground mt-1">
                  When enabled, all registered users may consider you available without individual approval.
                </p>
              </div>
            </div>
            <Switch 
              checked={nationalFreeUse}
              onCheckedChange={handleFreeUseToggle}
            />
          </div>

          {/* Familial Clustering Toggle */}
          <div className="flex items-start justify-between gap-4 p-4 bg-secondary/50 rounded-sm">
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h4 className="font-medium text-foreground cursor-help">
                      Familial Clustering
                    </h4>
                  </TooltipTrigger>
                  <TooltipContent className="federal-tooltip max-w-sm">
                    <p>Per Section 6(a), familial clustering allows linked family members 
                    to share visibility controls. Requires mutual confirmation from all 
                    linked parties. Optional feature.</p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-xs text-muted-foreground mt-1">
                  Link family members for shared visibility controls (requires mutual confirmation).
                </p>
              </div>
            </div>
            <Switch 
              checked={familialClustering}
              onCheckedChange={onFamilialClusteringChange}
            />
          </div>
        </div>

        {/* Free Use Warning Dialog */}
        <Dialog open={showFreeUseWarning} onOpenChange={setShowFreeUseWarning}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Confirm National Free-Use Activation
              </DialogTitle>
              <DialogDescription>
                You are about to enable blanket national consent.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <p className="text-sm text-foreground mb-4">
                By enabling National Free-Use, you consent to the following:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                <li>All 327 million registered users may consider you available</li>
                <li>Individual follow approval is bypassed</li>
                <li>This status is publicly visible in the National Registry</li>
                <li>Revocation takes effect immediately but is logged permanently</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-end">
              <button 
                className="federal-button-secondary"
                onClick={() => setShowFreeUseWarning(false)}
              >
                Cancel
              </button>
              <button 
                className="federal-button bg-destructive hover:bg-destructive/90"
                onClick={() => {
                  onNationalFreeUseChange(true);
                  setShowFreeUseWarning(false);
                }}
              >
                I Understand, Enable
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
