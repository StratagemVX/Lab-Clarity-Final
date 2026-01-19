import { useState } from "react";
import { testCategories, LabTest, evaluateTestResult } from "@/data/labTests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, BarChart3, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestEntry {
  id: string;
  test: LabTest | null;
  value: string;
  categoryId: string;
}

interface ComparisonViewProps {
  onClose: () => void;
}

const statusConfig = {
  low: {
    icon: AlertTriangle,
    label: "Low",
    bgClass: "bg-status-low-bg",
    textClass: "text-status-low",
  },
  normal: {
    icon: CheckCircle,
    label: "Normal",
    bgClass: "bg-status-normal-bg",
    textClass: "text-status-normal",
  },
  high: {
    icon: XCircle,
    label: "High",
    bgClass: "bg-status-high-bg",
    textClass: "text-status-high",
  },
};

const ComparisonView = ({ onClose }: ComparisonViewProps) => {
  const [entries, setEntries] = useState<TestEntry[]>([
    { id: "1", test: null, value: "", categoryId: "" },
    { id: "2", test: null, value: "", categoryId: "" },
  ]);

  const addEntry = () => {
    setEntries([
      ...entries,
      { id: Date.now().toString(), test: null, value: "", categoryId: "" },
    ]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 2) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const updateEntry = (id: string, updates: Partial<TestEntry>) => {
    setEntries(entries.map(e => 
      e.id === id ? { ...e, ...updates } : e
    ));
  };

  const getTestsForCategory = (categoryId: string) => {
    const category = testCategories.find(c => c.id === categoryId);
    return category?.tests || [];
  };

  const analyzedEntries = entries
    .filter(e => e.test && e.value && !isNaN(parseFloat(e.value)))
    .map(e => ({
      ...e,
      numValue: parseFloat(e.value),
      status: evaluateTestResult(parseFloat(e.value), e.test!),
    }));

  const summary = {
    total: analyzedEntries.length,
    normal: analyzedEntries.filter(e => e.status === "normal").length,
    low: analyzedEntries.filter(e => e.status === "low").length,
    high: analyzedEntries.filter(e => e.status === "high").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Multi-Test Comparison</h2>
            <p className="text-sm text-muted-foreground">Analyze multiple tests at once</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Test Entries */}
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <Card key={entry.id} className="p-4 border border-border">
            <div className="flex items-start gap-4">
              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                {index + 1}
              </span>
              <div className="flex-1 grid gap-3 sm:grid-cols-3">
                <Select
                  value={entry.categoryId}
                  onValueChange={(v) => updateEntry(entry.id, { categoryId: v, test: null })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {testCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={entry.test?.name || ""}
                  onValueChange={(v) => {
                    const test = getTestsForCategory(entry.categoryId).find(t => t.name === v);
                    updateEntry(entry.id, { test: test || null });
                  }}
                  disabled={!entry.categoryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select test" />
                  </SelectTrigger>
                  <SelectContent>
                    {getTestsForCategory(entry.categoryId).map(test => (
                      <SelectItem key={test.name} value={test.name}>
                        {test.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Value"
                    value={entry.value}
                    onChange={(e) => updateEntry(entry.id, { value: e.target.value })}
                    disabled={!entry.test}
                    className="flex-1"
                  />
                  {entry.test && (
                    <span className="flex items-center text-sm text-muted-foreground min-w-[60px]">
                      {entry.test.unit}
                    </span>
                  )}
                </div>
              </div>
              {entries.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEntry(entry.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addEntry} className="w-full gap-2">
        <Plus className="w-4 h-4" />
        Add Another Test
      </Button>

      {/* Summary Panel */}
      {analyzedEntries.length > 0 && (
        <Card className="p-6 border border-border bg-card">
          <h3 className="font-display font-semibold text-foreground mb-4">Health Panel Summary</h3>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-muted">
              <div className="text-2xl font-bold text-foreground">{summary.total}</div>
              <div className="text-xs text-muted-foreground">Total Tests</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-status-normal-bg">
              <div className="text-2xl font-bold text-status-normal">{summary.normal}</div>
              <div className="text-xs text-status-normal">Normal</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-status-low-bg">
              <div className="text-2xl font-bold text-status-low">{summary.low}</div>
              <div className="text-xs text-status-low">Low</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-status-high-bg">
              <div className="text-2xl font-bold text-status-high">{summary.high}</div>
              <div className="text-xs text-status-high">High</div>
            </div>
          </div>

          <div className="space-y-3">
            {analyzedEntries.map((entry) => {
              const config = statusConfig[entry.status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={entry.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border",
                    config.bgClass
                  )}
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className={cn("w-5 h-5", config.textClass)} />
                    <div>
                      <div className="font-medium text-foreground">{entry.test?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Range: {entry.test?.min} - {entry.test?.max} {entry.test?.unit}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">
                      {entry.numValue} {entry.test?.unit}
                    </div>
                    <Badge variant="outline" className={cn("text-xs", config.textClass)}>
                      {config.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ComparisonView;
