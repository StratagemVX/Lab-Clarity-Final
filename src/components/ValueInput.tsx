import { useState, useEffect } from "react";
import { LabTest } from "@/data/labTests";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface ValueInputProps {
  test: LabTest;
  value: string;
  onValueChange: (value: string) => void;
  onAnalyze: () => void;
}

const ValueInput = ({ test, value, onValueChange, onAnalyze }: ValueInputProps) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (value === "") {
      setIsValid(true);
      return;
    }
    const numValue = parseFloat(value);
    setIsValid(!isNaN(numValue) && numValue >= 0);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value && isValid) {
      onAnalyze();
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h3 className="font-display font-semibold text-foreground mb-1">{test.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Reference Range: <span className="font-medium text-foreground">{test.min} - {test.max} {test.unit}</span>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="number"
                  step="any"
                  placeholder="Enter your value"
                  value={value}
                  onChange={(e) => onValueChange(e.target.value)}
                  className={`text-lg h-12 pr-16 ${!isValid ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {test.unit}
                </span>
              </div>
              {!isValid && (
                <p className="text-sm text-destructive mt-1">Please enter a valid number</p>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={!value || !isValid}
            className="w-full h-11 gradient-medical text-primary-foreground font-medium"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Analyze Result
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ValueInput;
