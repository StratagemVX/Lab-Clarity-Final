import { Stethoscope, Info, BarChart3, History } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderProps {
  onOpenComparison?: () => void;
  onOpenHistory?: () => void;
}

const Header = ({ onOpenComparison, onOpenHistory }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-medical flex items-center justify-center shadow-card">
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">
                LabGuide
              </h1>
              <p className="text-xs text-muted-foreground">
                Medical Test Explainer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onOpenComparison && (
              <Button variant="ghost" size="sm" onClick={onOpenComparison} className="gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden md:inline">Compare</span>
              </Button>
            )}
            
            {onOpenHistory && (
              <Button variant="ghost" size="sm" onClick={onOpenHistory} className="gap-2">
                <History className="w-4 h-4" />
                <span className="hidden md:inline">History</span>
              </Button>
            )}

            <ThemeToggle />

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Info className="w-4 h-4" />
                  <span className="hidden sm:inline">About</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display">About LabGuide</DialogTitle>
                  <DialogDescription className="text-left space-y-3 pt-2">
                    <p>
                      LabGuide helps you understand common medical lab test results in simple, 
                      everyday language. Our goal is to make healthcare information more accessible.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Coverage of 30+ common lab tests</li>
                        <li>Easy-to-understand explanations</li>
                        <li>Visual range indicators</li>
                        <li>Practical health tips</li>
                        <li>OCR image upload for lab reports</li>
                        <li>Multi-test comparison view</li>
                        <li>Test history with trend charts</li>
                        <li>PDF export for sharing</li>
                        <li>Dark mode support</li>
                      </ul>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        <strong>Remember:</strong> This tool is for educational purposes only 
                        and does not replace professional medical advice.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
