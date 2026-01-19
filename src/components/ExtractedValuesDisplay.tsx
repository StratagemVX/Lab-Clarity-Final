import { findTestByName, LabTest, TestCategory } from "@/data/labTests";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtractedValue {
  testName: string;
  value: number;
  unit: string;
  matchedTest: { test: LabTest; category: TestCategory } | null;
}

interface ExtractedValuesDisplayProps {
  extractedText: string;
  onSelectValue: (test: LabTest, value: number, categoryId: string) => void;
}

const ExtractedValuesDisplay = ({ extractedText, onSelectValue }: ExtractedValuesDisplayProps) => {
  // Parse extracted text to find test values
  const parseExtractedText = (): ExtractedValue[] => {
    const lines = extractedText.split("\n");
    const extractedValues: ExtractedValue[] = [];
    
    // Common patterns for lab values
    const patterns = [
      // Pattern: "Test Name: 12.5 mg/dL" or "Test Name 12.5 mg/dL"
      /([A-Za-z\s\(\)]+)[:\s]+(\d+\.?\d*)\s*([a-zA-Z/%²³]+)?/g,
      // Pattern: "12.5 Test Name"
      /(\d+\.?\d*)\s+([A-Za-z\s]+)/g,
    ];

    lines.forEach((line) => {
      const cleanLine = line.trim();
      if (!cleanLine) return;

      // Try to match patterns
      const match1 = cleanLine.match(/([A-Za-z][A-Za-z\s\(\)]+)[:\s]+(\d+\.?\d*)\s*([a-zA-Z/%²³]*)/);
      
      if (match1) {
        const testName = match1[1].trim();
        const value = parseFloat(match1[2]);
        const unit = match1[3] || "";
        
        if (!isNaN(value) && testName.length > 2) {
          const matchedTest = findTestByName(testName);
          extractedValues.push({
            testName,
            value,
            unit,
            matchedTest,
          });
        }
      }
    });

    // Remove duplicates based on test name
    const uniqueValues = extractedValues.filter((v, i, arr) => 
      arr.findIndex(x => x.testName.toLowerCase() === v.testName.toLowerCase()) === i
    );

    return uniqueValues.slice(0, 10); // Limit to 10 values
  };

  const extractedValues = parseExtractedText();

  if (extractedValues.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <div className="flex items-center gap-3 text-muted-foreground">
          <AlertCircle className="w-5 h-5" />
          <p>No recognizable test values found. Try uploading a clearer image or enter values manually.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
      <h3 className="font-display font-semibold text-foreground">Detected Values</h3>
      <p className="text-sm text-muted-foreground">
        Click on a matched test to analyze the result
      </p>
      
      <div className="space-y-2">
        {extractedValues.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border",
              item.matchedTest 
                ? "bg-accent/50 border-primary/20 cursor-pointer hover:bg-accent"
                : "bg-muted/50 border-border"
            )}
            onClick={() => {
              if (item.matchedTest) {
                onSelectValue(
                  item.matchedTest.test, 
                  item.value, 
                  item.matchedTest.category.id
                );
              }
            }}
          >
            <div className="flex items-center gap-3">
              {item.matchedTest ? (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              <div>
                <p className={cn(
                  "font-medium",
                  item.matchedTest ? "text-foreground" : "text-muted-foreground"
                )}>
                  {item.testName}
                </p>
                {item.matchedTest && (
                  <p className="text-xs text-muted-foreground">
                    Matched: {item.matchedTest.test.name}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">
                {item.value} <span className="text-sm font-normal text-muted-foreground">{item.unit}</span>
              </p>
              {!item.matchedTest && (
                <p className="text-xs text-muted-foreground">Not in database</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtractedValuesDisplay;
