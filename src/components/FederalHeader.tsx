import { Shield, Lock, LogOut, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FederalHeaderProps {
  username: string;
  onLogout?: () => void;
}

export function FederalHeader({ username, onLogout }: FederalHeaderProps) {
  return (
    <header className="federal-header">
      {/* Top utility bar */}
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
          <Lock className="w-3 h-3" />
          <span>An official website of the United States government</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-primary-foreground/80">
          <span className="hidden sm:inline">Secure Connection</span>
          <Lock className="w-3 h-3" />
        </div>
      </div>
      
      {/* Main header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto py-3 border-t border-primary-foreground/20 mt-2">
        {/* Logo and title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center border-2 border-primary-foreground/30">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight">
              AmIFuckable.gov
            </h1>
            <p className="text-xs text-primary-foreground/70 hidden sm:block">
              U.S. Department of Health and Human Services
            </p>
          </div>
        </div>

        {/* User section */}
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-foreground/10 rounded-sm">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{username}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="federal-tooltip">
              <p>Logged in as {username}</p>
            </TooltipContent>
          </Tooltip>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary-foreground text-primary rounded-sm hover:bg-primary-foreground/90 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
