import { useState } from "react";
import { AtSign, Edit3, Check, X, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UsernameSectionProps {
  username: string;
  onUsernameChange: (newUsername: string) => void;
}

export function UsernameSection({ username, onUsernameChange }: UsernameSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(username);

  const handleSave = () => {
    if (editValue.trim()) {
      onUsernameChange(editValue.trim().replace(/^@/, ""));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(username);
    setIsEditing(false);
  };

  return (
    <section className="section-card">
      <div className="section-header flex items-center gap-2">
        <AtSign className="w-4 h-4" />
        Public Username / Handle
      </div>
      
      <div className="section-body">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="data-label mb-2">Public Username</p>
            
            {isEditing ? (
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="federal-input pl-7"
                    placeholder="YourUsername"
                    autoFocus
                  />
                </div>
                <button 
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-sm transition-colors"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCancel}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xl font-mono font-medium text-primary">
                  @{username}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-accent rounded-sm transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="federal-tooltip">
                    <p>Edit your public username</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex items-start gap-2 p-3 bg-accent/50 rounded-sm">
          <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            This username is used for mutual-follow requests and public visibility. 
            Your legal name remains the primary search key for the National Registry. 
            Username changes are logged and may be reviewed.
          </p>
        </div>
      </div>
    </section>
  );
}
