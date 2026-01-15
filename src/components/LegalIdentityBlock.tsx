import { Shield, CheckCircle, Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LegalIdentityData {
  legalName: string;
  dateOfBirth: string;
  maturityDate: string;
  registrationDate: string;
  registrationStatus: "Verified" | "Pending" | "Suspended";
}

interface LegalIdentityBlockProps {
  data: LegalIdentityData;
}

export function LegalIdentityBlock({ data }: LegalIdentityBlockProps) {
  return (
    <section className="section-card">
      <div className="section-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Registered Legal Identity
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-help">
              <Lock className="w-3 h-3" />
              <span>Irrevocable</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="federal-tooltip max-w-sm">
            <p>Per Section 3(b), legal identity information is irrevocable without court order. 
            All changes require formal petition to the Federal Registry Court.</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="section-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legal Full Name */}
          <div>
            <p className="data-label">Legal Full Name</p>
            <p className="data-value text-lg">{data.legalName}</p>
          </div>
          
          {/* Date of Birth */}
          <div>
            <p className="data-label">Date of Birth</p>
            <p className="data-value">{data.dateOfBirth}</p>
          </div>
          
          {/* Biological Maturity Date */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <p className="data-label">Self-Attested Biological Maturity Date</p>
                <p className="data-value">{data.maturityDate}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="federal-tooltip max-w-sm">
              <p>Per Section 2(d), the date on which the registrant attests biological 
              maturity was achieved. Subject to federal verification protocols.</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Registration Date */}
          <div>
            <p className="data-label">Registration Date</p>
            <p className="data-value">{data.registrationDate}</p>
          </div>
          
          {/* Registration Status */}
          <div className="md:col-span-2">
            <p className="data-label">Registration Status</p>
            <div className="flex items-center gap-2 mt-1">
              {data.registrationStatus === "Verified" && (
                <span className="verified-badge">
                  <CheckCircle className="w-3 h-3" />
                  {data.registrationStatus} · Active
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <p className="legal-notice">
            This information is permanently recorded in the Federal Sexual Availability Registry 
            and cannot be modified without formal court petition pursuant to Section 3(c).
          </p>
        </div>
      </div>
    </section>
  );
}
