import { LabTest } from "@/data/labTests";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface TestSelectorProps {
  tests: LabTest[];
  selectedTest: LabTest | null;
  onSelectTest: (test: LabTest) => void;
}

const TestSelector = ({ tests, selectedTest, onSelectTest }: TestSelectorProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-display font-semibold text-foreground">Select Test</h2>
      <div className="grid gap-2">
        {tests.map((test) => {
          const isSelected = selectedTest?.name === test.name;
          
          return (
            <button
              key={test.name}
              onClick={() => onSelectTest(test)}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border transition-all duration-200 text-left",
                "hover:shadow-card hover:border-primary/30",
                isSelected
                  ? "bg-accent border-primary shadow-card"
                  : "bg-card border-border"
              )}
            >
              <div>
                <p className={cn(
                  "font-medium",
                  isSelected ? "text-primary" : "text-foreground"
                )}>
                  {test.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Reference: {test.min} - {test.max} {test.unit}
                </p>
              </div>
              <ChevronRight className={cn(
                "w-5 h-5 transition-colors",
                isSelected ? "text-primary" : "text-muted-foreground"
              )} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TestSelector;
