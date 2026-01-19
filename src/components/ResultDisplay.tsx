import { LabTest, TestStatus, evaluateTestResult } from "@/data/labTests";
import { CheckCircle, AlertTriangle, XCircle, Lightbulb, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PDFExport from "@/components/PDFExport";
import { useEffect } from "react";
import { useTestHistory } from "@/hooks/useTestHistory";

interface ResultDisplayProps {
  test: LabTest;
  value: number;
}

const statusConfig = {
  low: {
    icon: AlertTriangle,
    label: "Below Range",
    bgClass: "bg-status-low-bg",
    textClass: "text-status-low",
    borderClass: "border-status-low/30",
  },
  normal: {
    icon: CheckCircle,
    label: "Normal Range",
    bgClass: "bg-status-normal-bg",
    textClass: "text-status-normal",
    borderClass: "border-status-normal/30",
  },
  high: {
    icon: XCircle,
    label: "Above Range",
    bgClass: "bg-status-high-bg",
    textClass: "text-status-high",
    borderClass: "border-status-high/30",
  },
};

const ResultDisplay = ({ test, value }: ResultDisplayProps) => {
  const status = evaluateTestResult(value, test);
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const { addRecord } = useTestHistory();

  // Save to history when result is displayed
  useEffect(() => {
    addRecord(test, value);
  }, [test.name, value]);

  const getMessage = () => {
    switch (status) {
      case "low":
        return test.lowMsg;
      case "normal":
        return test.normalMsg;
      case "high":
        return test.highMsg;
    }
  };

  // Calculate position on the range bar (0-100%)
  const getBarPosition = () => {
    const range = test.max - test.min;
    const extendedMin = test.min - range * 0.3;
    const extendedMax = test.max + range * 0.3;
    const extendedRange = extendedMax - extendedMin;
    
    const clampedValue = Math.max(extendedMin, Math.min(extendedMax, value));
    return ((clampedValue - extendedMin) / extendedRange) * 100;
  };

  const normalStartPercent = 30;
  const normalEndPercent = 70;
  const markerPosition = getBarPosition();

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Status Card */}
      <div className={cn(
        "rounded-xl border-2 p-6 transition-all",
        config.bgClass,
        config.borderClass
      )}>
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
            status === "normal" ? "bg-status-normal/10" : 
            status === "low" ? "bg-status-low/10" : "bg-status-high/10"
          )}>
            <StatusIcon className={cn("w-6 h-6", config.textClass)} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("text-sm font-semibold uppercase tracking-wide", config.textClass)}>
                {config.label}
              </span>
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              {value} <span className="text-lg font-normal text-muted-foreground">{test.unit}</span>
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              {getMessage()}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Range Bar */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <h4 className="font-display font-semibold text-foreground mb-4">Reference Range</h4>
        
        <div className="relative h-8 mb-3">
          {/* Background bar */}
          <div className="absolute inset-0 rounded-full overflow-hidden flex">
            <div 
              className="bg-status-low/30 h-full"
              style={{ width: `${normalStartPercent}%` }}
            />
            <div 
              className="bg-status-normal/30 h-full"
              style={{ width: `${normalEndPercent - normalStartPercent}%` }}
            />
            <div 
              className="bg-status-high/30 h-full"
              style={{ width: `${100 - normalEndPercent}%` }}
            />
          </div>
          
          {/* Value marker */}
          <div 
            className="absolute top-0 bottom-0 flex items-center transition-all duration-500"
            style={{ left: `${markerPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className={cn(
              "w-4 h-10 rounded-full border-4 border-card shadow-lg",
              status === "normal" ? "bg-status-normal" :
              status === "low" ? "bg-status-low" : "bg-status-high"
            )} />
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between text-sm">
          <span className="text-status-low font-medium">Low</span>
          <span className="text-muted-foreground">
            {test.min} - {test.max} {test.unit}
          </span>
          <span className="text-status-high font-medium">High</span>
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h4 className="font-display font-semibold text-foreground">Health Tips</h4>
        </div>
        
        <ul className="space-y-3">
          {test.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <PDFExport test={test} value={value} />
      </div>
    </div>
  );
};

export default ResultDisplay;
