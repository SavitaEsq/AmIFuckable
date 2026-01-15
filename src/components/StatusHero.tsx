import { useState } from "react";
import { RefreshCw, Calendar } from "lucide-react";
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

interface StatusHeroProps {
  isAvailable: boolean;
  lastUpdated: string;
  onStatusChange: (newStatus: boolean) => void;
}

export function StatusHero({ isAvailable, lastUpdated, onStatusChange }: StatusHeroProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(isAvailable);

  const handleConfirm = () => {
    onStatusChange(pendingStatus);
    setIsDialogOpen(false);
  };

  return (
    <section className="section-card">
      <div className="section-header flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Current Availability Declaration
      </div>
      <div className="section-body text-center py-8 md:py-12">
        {/* Main status display */}
        <div className="mb-6">
          <h2 
            className={`text-4xl md:text-6xl font-black tracking-tight mb-4 ${
              isAvailable ? 'status-available' : 'status-unavailable'
            }`}
          >
            {isAvailable ? 'FUCKABLE' : 'UNFUCKABLE'}
          </h2>
          
          <div className={isAvailable ? 'status-badge-available' : 'status-badge-unavailable'}>
            {isAvailable ? '● AVAILABLE' : '● UNAVAILABLE'}
          </div>
        </div>

        {/* Last updated */}
        <p className="text-sm text-muted-foreground mb-6">
          Last Updated: {lastUpdated}
        </p>

        {/* Update button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <button className="federal-button gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Update Declaration Status
                </button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent className="federal-tooltip">
              <p>Submit a new availability declaration pursuant to Section 4(a)</p>
            </TooltipContent>
          </Tooltip>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-primary font-bold">
                Update Availability Declaration
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Pursuant to Section 4(a), you may update your sexual availability status. 
                This declaration is publicly visible and federally binding.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-4 p-4 border border-border rounded-sm cursor-pointer hover:bg-accent transition-colors">
                  <input 
                    type="radio" 
                    name="status" 
                    checked={pendingStatus === true}
                    onChange={() => setPendingStatus(true)}
                    className="w-5 h-5 accent-green-500"
                  />
                  <div>
                    <span className="font-bold text-green-600">FUCKABLE</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      Declare yourself sexually available to approved mutual follows
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center gap-4 p-4 border border-border rounded-sm cursor-pointer hover:bg-accent transition-colors">
                  <input 
                    type="radio" 
                    name="status" 
                    checked={pendingStatus === false}
                    onChange={() => setPendingStatus(false)}
                    className="w-5 h-5 accent-red-500"
                  />
                  <div>
                    <span className="font-bold text-red-600">UNFUCKABLE</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      Declare yourself sexually unavailable at this time
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button 
                className="federal-button-secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="federal-button"
                onClick={handleConfirm}
              >
                Confirm Declaration
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4 border-t border-border pt-4">
              ⚠️ Warning: False declarations constitute a federal felony under Section 4(c).
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
