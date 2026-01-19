import { useState } from "react";
import { TestRecord, useTestHistory } from "@/hooks/useTestHistory";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { History, Trash2, X, TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface TestHistoryViewProps {
  onClose: () => void;
}

const statusConfig = {
  low: {
    bgClass: "bg-status-low-bg",
    textClass: "text-status-low",
    label: "Low",
  },
  normal: {
    bgClass: "bg-status-normal-bg",
    textClass: "text-status-normal",
    label: "Normal",
  },
  high: {
    bgClass: "bg-status-high-bg",
    textClass: "text-status-high",
    label: "High",
  },
};

const TestHistoryView = ({ onClose }: TestHistoryViewProps) => {
  const { history, deleteRecord, clearHistory, getTestHistory } = useTestHistory();
  const [selectedTest, setSelectedTest] = useState<string>("");

  const uniqueTests = [...new Set(history.map(r => r.testName))];
  const chartData = selectedTest ? getTestHistory(selectedTest) : [];

  const getTrend = (records: TestRecord[]) => {
    if (records.length < 2) return null;
    const latest = records[records.length - 1].value;
    const previous = records[records.length - 2].value;
    if (latest > previous) return "up";
    if (latest < previous) return "down";
    return "stable";
  };

  const trend = chartData.length >= 2 ? getTrend(chartData) : null;
  const latestRecord = chartData.length > 0 ? chartData[chartData.length - 1] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <History className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Test History</h2>
            <p className="text-sm text-muted-foreground">Track your results over time</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {history.length === 0 ? (
        <Card className="p-8 text-center border border-border">
          <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-foreground mb-2">No History Yet</h3>
          <p className="text-muted-foreground">
            Your analyzed test results will appear here for tracking.
          </p>
        </Card>
      ) : (
        <>
          {/* Chart Section */}
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Trend Chart
              </h3>
              <Select value={selectedTest} onValueChange={setSelectedTest}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a test" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueTests.map(test => (
                    <SelectItem key={test} value={test}>
                      {test}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTest && chartData.length > 0 ? (
              <div className="space-y-4">
                {/* Trend indicator */}
                {trend && latestRecord && (
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      {trend === "up" && <TrendingUp className="w-5 h-5 text-status-high" />}
                      {trend === "down" && <TrendingDown className="w-5 h-5 text-status-low" />}
                      {trend === "stable" && <Minus className="w-5 h-5 text-muted-foreground" />}
                      <span className="text-sm font-medium">
                        {trend === "up" ? "Increasing" : trend === "down" ? "Decreasing" : "Stable"}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Latest: <span className="font-semibold text-foreground">{latestRecord.value} {latestRecord.unit}</span>
                    </div>
                  </div>
                )}

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        stroke="hsl(var(--border))"
                      />
                      <YAxis 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        stroke="hsl(var(--border))"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      {latestRecord && (
                        <>
                          <ReferenceLine
                            y={latestRecord.min}
                            stroke="hsl(var(--status-low))"
                            strokeDasharray="5 5"
                            label={{ value: "Min", fill: "hsl(var(--status-low))", fontSize: 10 }}
                          />
                          <ReferenceLine
                            y={latestRecord.max}
                            stroke="hsl(var(--status-high))"
                            strokeDasharray="5 5"
                            label={{ value: "Max", fill: "hsl(var(--status-high))", fontSize: 10 }}
                          />
                        </>
                      )}
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Select a test to view trend chart
              </div>
            )}
          </Card>

          {/* History List */}
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Recent Results</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {history.map((record) => {
                const config = statusConfig[record.status];
                return (
                  <div
                    key={record.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      config.bgClass
                    )}
                  >
                    <div>
                      <div className="font-medium text-foreground">{record.testName}</div>
                      <div className="text-sm text-muted-foreground">{record.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-foreground">
                          {record.value} {record.unit}
                        </div>
                        <Badge variant="outline" className={cn("text-xs", config.textClass)}>
                          {config.label}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRecord(record.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default TestHistoryView;
