import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { LabTest, TestStatus, evaluateTestResult } from "@/data/labTests";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PDFExportProps {
  test: LabTest;
  value: number;
  className?: string;
}

const PDFExport = ({ test, value, className }: PDFExportProps) => {
  const status = evaluateTestResult(value, test);

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

  const getStatusLabel = () => {
    switch (status) {
      case "low":
        return "Below Range";
      case "normal":
        return "Normal Range";
      case "high":
        return "Above Range";
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(13, 148, 136); // Primary teal color
    doc.rect(0, 0, pageWidth, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("LabGuide", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Medical Test Analysis Report", 20, 33);
    
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 20, 25, { align: "right" });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Test Information
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Test Result", 20, 55);

    // Status box
    const statusColors: Record<TestStatus, [number, number, number]> = {
      low: [234, 179, 8], // Yellow
      normal: [34, 197, 94], // Green
      high: [239, 68, 68], // Red
    };
    
    const [r, g, b] = statusColors[status];
    doc.setFillColor(r, g, b);
    doc.roundedRect(20, 60, pageWidth - 40, 30, 3, 3, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(getStatusLabel().toUpperCase(), 30, 75);
    
    doc.setFontSize(14);
    doc.text(`${value} ${test.unit}`, pageWidth - 30, 75, { align: "right" });

    // Reset colors
    doc.setTextColor(0, 0, 0);

    // Test Details Table
    autoTable(doc, {
      startY: 100,
      head: [["Parameter", "Value"]],
      body: [
        ["Test Name", test.name],
        ["Your Value", `${value} ${test.unit}`],
        ["Normal Range", `${test.min} - ${test.max} ${test.unit}`],
        ["Status", getStatusLabel()],
      ],
      theme: "striped",
      headStyles: {
        fillColor: [13, 148, 136],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        fontSize: 11,
        cellPadding: 8,
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 60 },
        1: { cellWidth: "auto" },
      },
    });

    // Interpretation
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Interpretation", 20, finalY + 15);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const interpretation = doc.splitTextToSize(getMessage(), pageWidth - 40);
    doc.text(interpretation, 20, finalY + 25);

    // Health Tips
    const tipsY = finalY + 25 + interpretation.length * 6 + 10;
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Health Tips", 20, tipsY);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    let currentY = tipsY + 10;
    test.tips.forEach((tip, index) => {
      const tipText = `${index + 1}. ${tip}`;
      const lines = doc.splitTextToSize(tipText, pageWidth - 45);
      doc.text(lines, 25, currentY);
      currentY += lines.length * 6 + 3;
    });

    // Disclaimer
    doc.setFillColor(254, 243, 199); // Amber background
    doc.rect(0, doc.internal.pageSize.getHeight() - 35, pageWidth, 35, "F");
    
    doc.setFontSize(9);
    doc.setTextColor(146, 64, 14); // Amber text
    doc.setFont("helvetica", "bold");
    doc.text("DISCLAIMER", 20, doc.internal.pageSize.getHeight() - 25);
    
    doc.setFont("helvetica", "normal");
    const disclaimer = doc.splitTextToSize(
      "This report is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.",
      pageWidth - 40
    );
    doc.text(disclaimer, 20, doc.internal.pageSize.getHeight() - 18);

    // Save
    doc.save(`LabGuide-${test.name.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <Button onClick={generatePDF} variant="outline" className={className}>
      <Download className="w-4 h-4 mr-2" />
      Export PDF
    </Button>
  );
};

export default PDFExport;
