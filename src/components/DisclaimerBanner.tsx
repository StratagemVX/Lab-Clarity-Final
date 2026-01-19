import { AlertTriangle } from "lucide-react";

const DisclaimerBanner = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800">
        <strong>Important:</strong> This application provides educational interpretation of lab test values only. 
        It does not offer diagnosis, treatment, or medical advice. Always consult a healthcare professional 
        for proper medical guidance.
      </p>
    </div>
  );
};

export default DisclaimerBanner;
