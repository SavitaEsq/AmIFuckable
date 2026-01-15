import { Shield, ExternalLink } from "lucide-react";

export function FederalFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Agency info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5" />
              <span className="font-bold">AmIFuckable.gov</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              An official website of the United States Government
            </p>
            <p className="text-sm text-primary-foreground/70 mt-2">
              U.S. Department of Health and Human Services<br />
              Office of Sexual Availability Registration
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold mb-3 text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-primary-foreground flex items-center gap-1">
                  Federal Registry Act (Full Text)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground flex items-center gap-1">
                  Section 4: Declaration Requirements
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground flex items-center gap-1">
                  Section 5: Consent Protocols
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground">
                  Contact Registry Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-3 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Terms of Use</a></li>
              <li><a href="#" className="hover:text-primary-foreground">Accessibility</a></li>
              <li><a href="#" className="hover:text-primary-foreground">FOIA Requests</a></li>
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="pt-6 border-t border-primary-foreground/20">
          <p className="text-xs text-primary-foreground/60 leading-relaxed max-w-4xl">
            <strong>LEGAL NOTICE:</strong> False misrepresentation of availability status 
            constitutes a federal felony under Section 4(c) of the Federal Sexual Availability 
            Registration Act, punishable by up to 10 years imprisonment and/or $250,000 fine. 
            All declarations are public record and irrevocable absent formal court order pursuant 
            to Section 3(c). Coercion, force, or fraud in connection with any registration or 
            consent protocol remain fully prosecutable under existing federal and state law. 
            This system is monitored for unauthorized access.
          </p>
          
          <p className="text-xs text-primary-foreground/40 mt-4">
            © 2024 U.S. Department of Health and Human Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
