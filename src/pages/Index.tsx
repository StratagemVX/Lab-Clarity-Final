import { useState } from "react";
import Header from "@/components/Header";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import CategorySelector from "@/components/CategorySelector";
import TestSelector from "@/components/TestSelector";
import ValueInput from "@/components/ValueInput";
import ImageUploader from "@/components/ImageUploader";
import ResultDisplay from "@/components/ResultDisplay";
import ExtractedValuesDisplay from "@/components/ExtractedValuesDisplay";
import ComparisonView from "@/components/ComparisonView";
import TestHistoryView from "@/components/TestHistoryView";
import { testCategories, LabTest, TestCategory } from "@/data/labTests";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Keyboard, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ViewMode = "main" | "comparison" | "history";

const Index = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [analyzedValue, setAnalyzedValue] = useState<number | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [inputMethod, setInputMethod] = useState<"manual" | "upload">("manual");
  const [viewMode, setViewMode] = useState<ViewMode>("main");

  const selectedCategory = testCategories.find(c => c.id === selectedCategoryId);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedTest(null);
    setInputValue("");
    setAnalyzedValue(null);
    setExtractedText(null);
  };

  const handleTestSelect = (test: LabTest) => {
    setSelectedTest(test);
    setInputValue("");
    setAnalyzedValue(null);
  };

  const handleAnalyze = () => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      setAnalyzedValue(numValue);
    }
  };

  const handleTextExtracted = (text: string) => {
    setExtractedText(text);
  };

  const handleSelectExtractedValue = (test: LabTest, value: number, categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedTest(test);
    setInputValue(value.toString());
    setAnalyzedValue(value);
    setExtractedText(null);
    setInputMethod("manual");
  };

  const handleBack = () => {
    if (analyzedValue !== null) {
      setAnalyzedValue(null);
    } else if (selectedTest) {
      setSelectedTest(null);
      setInputValue("");
    } else if (selectedCategoryId) {
      setSelectedCategoryId(null);
    }
  };

  const handleReset = () => {
    setSelectedCategoryId(null);
    setSelectedTest(null);
    setInputValue("");
    setAnalyzedValue(null);
    setExtractedText(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onOpenComparison={() => setViewMode("comparison")}
        onOpenHistory={() => setViewMode("history")}
      />
      
      <main className="container max-w-4xl mx-auto px-4 py-6 pb-12">
        <div className="space-y-6">
          {/* Disclaimer */}
          <DisclaimerBanner />

          {/* Comparison View */}
          {viewMode === "comparison" && (
            <ComparisonView onClose={() => setViewMode("main")} />
          )}

          {/* History View */}
          {viewMode === "history" && (
            <TestHistoryView onClose={() => setViewMode("main")} />
          )}

          {/* Main View */}
          {viewMode === "main" && (
            <>
              {/* Breadcrumb Navigation */}
              {(selectedCategoryId || extractedText) && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <span className="text-muted-foreground">|</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Start Over
                  </Button>
                </div>
              )}

              {/* Input Method Tabs - Only show when no category selected */}
              {!selectedCategoryId && !extractedText && (
                <Tabs 
                  value={inputMethod} 
                  onValueChange={(v) => setInputMethod(v as "manual" | "upload")}
                  className="space-y-6"
                >
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="manual" className="gap-2">
                      <Keyboard className="w-4 h-4" />
                      Enter Manually
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Upload Report
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="manual" className="space-y-6 animate-fade-in">
                    <CategorySelector
                      categories={testCategories}
                      selectedCategory={selectedCategoryId}
                      onSelectCategory={handleCategorySelect}
                    />
                  </TabsContent>

                  <TabsContent value="upload" className="animate-fade-in">
                    <ImageUploader onTextExtracted={handleTextExtracted} />
                  </TabsContent>
                </Tabs>
              )}

              {/* Extracted Values from OCR */}
              {extractedText && !selectedTest && (
                <ExtractedValuesDisplay
                  extractedText={extractedText}
                  onSelectValue={handleSelectExtractedValue}
                />
              )}

              {/* Test Selection */}
              {selectedCategory && !selectedTest && inputMethod === "manual" && (
                <TestSelector
                  tests={selectedCategory.tests}
                  selectedTest={selectedTest}
                  onSelectTest={handleTestSelect}
                />
              )}

              {/* Value Input */}
              {selectedTest && analyzedValue === null && (
                <ValueInput
                  test={selectedTest}
                  value={inputValue}
                  onValueChange={setInputValue}
                  onAnalyze={handleAnalyze}
                />
              )}

              {/* Result Display */}
              {selectedTest && analyzedValue !== null && (
                <ResultDisplay
                  test={selectedTest}
                  value={analyzedValue}
                />
              )}

              {/* Footer Info */}
              {!selectedCategoryId && !extractedText && (
                <div className="text-center pt-8 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Covering <span className="font-semibold text-foreground">9 categories</span> and{" "}
                    <span className="font-semibold text-foreground">30+ tests</span> including CBC, Sugar, 
                    Lipid Profile, KFT, LFT, Thyroid, and more.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
