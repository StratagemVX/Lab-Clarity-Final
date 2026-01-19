import { useState, useCallback } from "react";
import { createWorker } from "tesseract.js";
import { Upload, Loader2, FileImage, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploaderProps {
  onTextExtracted: (text: string) => void;
}

const ImageUploader = ({ onTextExtracted }: ImageUploaderProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      onTextExtracted(text);
      toast.success("Text extracted successfully! Check the detected values below.");
    } catch (error) {
      console.error("OCR Error:", error);
      toast.error("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImage(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FileImage className="w-5 h-5 text-primary" />
        <h3 className="font-display font-semibold text-foreground">Upload Lab Report</h3>
      </div>
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center",
          isDragging
            ? "border-primary bg-accent"
            : "border-border bg-card hover:border-primary/50 hover:bg-accent/50",
          isProcessing && "pointer-events-none"
        )}
      >
        {preview ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img 
                src={preview} 
                alt="Lab report preview" 
                className="max-h-48 rounded-lg shadow-card mx-auto"
              />
              {!isProcessing && (
                <button
                  onClick={clearPreview}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:opacity-80"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-medium">Processing image...</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{progress}% complete</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing}
            />
            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center">
                <Upload className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Drop your lab report here
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse (PNG, JPG, PDF)
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        We use OCR technology to extract test values from your report. 
        For best results, ensure the image is clear and well-lit.
      </p>
    </div>
  );
};

export default ImageUploader;
