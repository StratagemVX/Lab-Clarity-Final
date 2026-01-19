export interface LabTest {
  name: string;
  unit: string;
  min: number;
  max: number;
  lowMsg: string;
  normalMsg: string;
  highMsg: string;
  tips: string[];
}

export interface TestCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  tests: LabTest[];
}

export const testCategories: TestCategory[] = [
  {
    id: "blood",
    name: "Blood (CBC)",
    icon: "Droplets",
    description: "Complete Blood Count analysis",
    tests: [
      {
        name: "Hemoglobin",
        unit: "g/dL",
        min: 12,
        max: 17,
        lowMsg: "Low hemoglobin may cause fatigue, weakness, or anemia. Your blood may have reduced oxygen-carrying capacity.",
        normalMsg: "Hemoglobin is in a healthy range. Your blood is carrying oxygen efficiently.",
        highMsg: "High hemoglobin may increase blood thickness and clot risk. This could indicate dehydration or other conditions.",
        tips: ["Eat iron-rich foods like spinach, red meat, and beans", "Ensure adequate vitamin B12 and folate intake", "Stay hydrated", "Consult a doctor if symptoms persist"]
      },
      {
        name: "WBC Count",
        unit: "cells/mcL",
        min: 4500,
        max: 11000,
        lowMsg: "Low white blood cell count may indicate weakened immune response or bone marrow issues.",
        normalMsg: "White blood cell count is normal. Your immune system appears healthy.",
        highMsg: "High white blood cell count may indicate infection, inflammation, or stress response.",
        tips: ["Maintain good hygiene", "Get adequate sleep", "Exercise regularly", "Eat a balanced diet rich in vitamins"]
      },
      {
        name: "Platelet Count",
        unit: "cells/mcL",
        min: 150000,
        max: 400000,
        lowMsg: "Low platelet count may cause easy bruising or bleeding. Blood clotting may be affected.",
        normalMsg: "Platelet count is in healthy range. Blood clotting function appears normal.",
        highMsg: "High platelet count may increase clotting risk. This could indicate inflammation or other conditions.",
        tips: ["Avoid medications that thin blood without doctor advice", "Report unusual bruising", "Stay hydrated", "Consult doctor for persistent abnormalities"]
      },
      {
        name: "RBC Count",
        unit: "million cells/mcL",
        min: 4.5,
        max: 5.5,
        lowMsg: "Low red blood cell count may indicate anemia or blood loss.",
        normalMsg: "Red blood cell count is normal. Oxygen transport appears healthy.",
        highMsg: "High red blood cell count may indicate dehydration or other conditions.",
        tips: ["Eat iron and B12 rich foods", "Stay properly hydrated", "Avoid smoking", "Get regular check-ups"]
      }
    ]
  },
  {
    id: "sugar",
    name: "Blood Sugar",
    icon: "Activity",
    description: "Glucose and diabetes markers",
    tests: [
      {
        name: "Fasting Blood Sugar",
        unit: "mg/dL",
        min: 70,
        max: 100,
        lowMsg: "Low blood sugar (hypoglycemia) may cause weakness, dizziness, or confusion.",
        normalMsg: "Fasting blood sugar is in healthy range. Glucose regulation appears normal.",
        highMsg: "High fasting blood sugar may indicate prediabetes or diabetes risk.",
        tips: ["Avoid excessive sugar intake", "Exercise regularly", "Maintain healthy weight", "Monitor if you have diabetes risk factors"]
      },
      {
        name: "Post-Prandial Blood Sugar",
        unit: "mg/dL",
        min: 70,
        max: 140,
        lowMsg: "Low blood sugar after meals may indicate reactive hypoglycemia.",
        normalMsg: "Post-meal blood sugar is in healthy range.",
        highMsg: "High post-meal blood sugar may indicate glucose intolerance or diabetes.",
        tips: ["Eat smaller, frequent meals", "Choose low glycemic index foods", "Include fiber and protein with meals", "Walk after meals"]
      },
      {
        name: "HbA1c",
        unit: "%",
        min: 4.0,
        max: 5.6,
        lowMsg: "Very low HbA1c may indicate hypoglycemia episodes or certain blood disorders.",
        normalMsg: "HbA1c is in normal range. Average blood sugar over past 3 months is healthy.",
        highMsg: "Elevated HbA1c indicates poor blood sugar control over past 2-3 months. Diabetes management may need attention.",
        tips: ["Monitor blood sugar regularly", "Follow prescribed diabetes plan", "Maintain consistent meal timing", "Exercise regularly"]
      }
    ]
  },
  {
    id: "lipid",
    name: "Lipid Profile",
    icon: "Heart",
    description: "Cholesterol and fat analysis",
    tests: [
      {
        name: "Total Cholesterol",
        unit: "mg/dL",
        min: 125,
        max: 200,
        lowMsg: "Very low cholesterol may affect hormone production and cell membrane integrity.",
        normalMsg: "Total cholesterol is in healthy range. Cardiovascular risk appears managed.",
        highMsg: "High cholesterol increases heart disease and stroke risk.",
        tips: ["Reduce saturated and trans fats", "Eat more fiber", "Exercise regularly", "Maintain healthy weight"]
      },
      {
        name: "LDL Cholesterol",
        unit: "mg/dL",
        min: 0,
        max: 100,
        lowMsg: "LDL cholesterol is at optimal low level.",
        normalMsg: "LDL (bad) cholesterol is in acceptable range.",
        highMsg: "High LDL cholesterol increases artery plaque buildup and heart disease risk.",
        tips: ["Limit red meat and full-fat dairy", "Avoid fried foods", "Eat nuts and olive oil", "Consider plant sterols"]
      },
      {
        name: "HDL Cholesterol",
        unit: "mg/dL",
        min: 40,
        max: 100,
        lowMsg: "Low HDL cholesterol reduces your heart's protective cholesterol. This increases cardiovascular risk.",
        normalMsg: "HDL (good) cholesterol is in healthy range. Heart protection is adequate.",
        highMsg: "High HDL cholesterol is generally protective for heart health.",
        tips: ["Exercise regularly", "Quit smoking", "Eat healthy fats", "Maintain healthy weight"]
      },
      {
        name: "Triglycerides",
        unit: "mg/dL",
        min: 0,
        max: 150,
        lowMsg: "Triglyceride levels are optimal.",
        normalMsg: "Triglyceride levels are in healthy range.",
        highMsg: "High triglycerides increase heart disease and pancreatitis risk.",
        tips: ["Limit sugar and refined carbs", "Reduce alcohol intake", "Eat fatty fish", "Exercise regularly"]
      }
    ]
  },
  {
    id: "kidney",
    name: "Kidney (KFT)",
    icon: "Scan",
    description: "Kidney function tests",
    tests: [
      {
        name: "Creatinine",
        unit: "mg/dL",
        min: 0.6,
        max: 1.3,
        lowMsg: "Low creatinine may indicate reduced muscle mass or liver issues.",
        normalMsg: "Creatinine is in normal range. Kidney filtration appears healthy.",
        highMsg: "High creatinine may indicate reduced kidney function or dehydration.",
        tips: ["Stay well hydrated", "Limit excessive protein intake", "Avoid nephrotoxic medications", "Monitor blood pressure"]
      },
      {
        name: "Blood Urea Nitrogen (BUN)",
        unit: "mg/dL",
        min: 7,
        max: 20,
        lowMsg: "Low BUN may indicate malnutrition or liver disease.",
        normalMsg: "BUN is in normal range. Kidney function appears adequate.",
        highMsg: "High BUN may indicate kidney stress, dehydration, or high protein intake.",
        tips: ["Stay hydrated", "Moderate protein intake", "Monitor kidney function regularly", "Limit salt intake"]
      },
      {
        name: "eGFR",
        unit: "mL/min/1.73m²",
        min: 90,
        max: 120,
        lowMsg: "Reduced eGFR indicates decreased kidney filtering capacity. Stages 1-5 kidney disease possible.",
        normalMsg: "eGFR is in normal range. Kidney filtration capacity is healthy.",
        highMsg: "Very high eGFR is usually not clinically significant.",
        tips: ["Control blood pressure", "Manage diabetes if present", "Avoid NSAIDs overuse", "Stay hydrated"]
      },
      {
        name: "Uric Acid",
        unit: "mg/dL",
        min: 2.5,
        max: 7.0,
        lowMsg: "Low uric acid is generally not concerning.",
        normalMsg: "Uric acid is in normal range.",
        highMsg: "High uric acid may cause gout or kidney stones.",
        tips: ["Limit purine-rich foods", "Stay well hydrated", "Reduce alcohol intake", "Maintain healthy weight"]
      }
    ]
  },
  {
    id: "liver",
    name: "Liver (LFT)",
    icon: "FileHeart",
    description: "Liver function tests",
    tests: [
      {
        name: "ALT (SGPT)",
        unit: "U/L",
        min: 7,
        max: 56,
        lowMsg: "Low ALT is generally normal.",
        normalMsg: "ALT is in normal range. Liver function appears healthy.",
        highMsg: "Elevated ALT may indicate liver inflammation or damage.",
        tips: ["Limit alcohol consumption", "Avoid unnecessary medications", "Maintain healthy weight", "Get hepatitis vaccination"]
      },
      {
        name: "AST (SGOT)",
        unit: "U/L",
        min: 10,
        max: 40,
        lowMsg: "Low AST is generally normal.",
        normalMsg: "AST is in normal range. Liver and muscle health appear adequate.",
        highMsg: "Elevated AST may indicate liver, heart, or muscle damage.",
        tips: ["Reduce alcohol intake", "Exercise moderately", "Eat antioxidant-rich foods", "Avoid hepatotoxic substances"]
      },
      {
        name: "Alkaline Phosphatase (ALP)",
        unit: "U/L",
        min: 44,
        max: 147,
        lowMsg: "Low ALP may indicate malnutrition or certain deficiencies.",
        normalMsg: "ALP is in normal range. Bone and liver health appear adequate.",
        highMsg: "Elevated ALP may indicate liver or bone conditions.",
        tips: ["Ensure adequate vitamin D", "Monitor bone health", "Limit alcohol", "Consult doctor for persistent elevation"]
      },
      {
        name: "Bilirubin (Total)",
        unit: "mg/dL",
        min: 0.1,
        max: 1.2,
        lowMsg: "Low bilirubin is generally not concerning.",
        normalMsg: "Bilirubin is in normal range. Liver processing appears healthy.",
        highMsg: "Elevated bilirubin may cause jaundice and indicate liver or gallbladder issues.",
        tips: ["Stay hydrated", "Avoid alcohol", "Eat liver-friendly foods", "Seek medical attention for jaundice"]
      }
    ]
  },
  {
    id: "thyroid",
    name: "Thyroid",
    icon: "Zap",
    description: "Thyroid function panel",
    tests: [
      {
        name: "TSH",
        unit: "mIU/L",
        min: 0.4,
        max: 4.0,
        lowMsg: "Low TSH may indicate hyperthyroidism (overactive thyroid).",
        normalMsg: "TSH is in normal range. Thyroid function appears balanced.",
        highMsg: "High TSH may indicate hypothyroidism (underactive thyroid).",
        tips: ["Ensure adequate iodine intake", "Monitor energy levels", "Report weight changes", "Get regular thyroid checks"]
      },
      {
        name: "T3 (Triiodothyronine)",
        unit: "ng/dL",
        min: 80,
        max: 200,
        lowMsg: "Low T3 may indicate hypothyroidism or illness.",
        normalMsg: "T3 is in normal range. Active thyroid hormone level is adequate.",
        highMsg: "High T3 may indicate hyperthyroidism.",
        tips: ["Monitor heart rate", "Report unexplained weight changes", "Note temperature sensitivity", "Regular thyroid monitoring"]
      },
      {
        name: "T4 (Thyroxine)",
        unit: "mcg/dL",
        min: 5.0,
        max: 12.0,
        lowMsg: "Low T4 may indicate hypothyroidism.",
        normalMsg: "T4 is in normal range. Thyroid hormone production is adequate.",
        highMsg: "High T4 may indicate hyperthyroidism.",
        tips: ["Avoid excessive iodine supplements", "Take thyroid medication consistently", "Regular monitoring if on treatment", "Note energy level changes"]
      }
    ]
  },
  {
    id: "infection",
    name: "Infection Markers",
    icon: "Shield",
    description: "Inflammation and infection indicators",
    tests: [
      {
        name: "CRP (C-Reactive Protein)",
        unit: "mg/L",
        min: 0,
        max: 3,
        lowMsg: "Low CRP indicates minimal inflammation.",
        normalMsg: "CRP is in normal range. No significant inflammation detected.",
        highMsg: "Elevated CRP indicates inflammation or infection in the body.",
        tips: ["Address underlying infections", "Anti-inflammatory diet may help", "Exercise regularly", "Manage chronic conditions"]
      },
      {
        name: "ESR (Erythrocyte Sedimentation Rate)",
        unit: "mm/hr",
        min: 0,
        max: 20,
        lowMsg: "Low ESR indicates minimal inflammation.",
        normalMsg: "ESR is in normal range. Inflammation markers are healthy.",
        highMsg: "Elevated ESR may indicate infection, inflammation, or autoimmune conditions.",
        tips: ["Identify infection source", "Rest adequately", "Stay hydrated", "Follow up with doctor"]
      },
      {
        name: "Procalcitonin",
        unit: "ng/mL",
        min: 0,
        max: 0.5,
        lowMsg: "Low procalcitonin indicates no bacterial infection.",
        normalMsg: "Procalcitonin is normal. No significant bacterial infection indicated.",
        highMsg: "Elevated procalcitonin strongly suggests bacterial infection and may require antibiotics.",
        tips: ["Complete prescribed antibiotics", "Rest and hydrate", "Monitor fever", "Seek medical care if worsening"]
      }
    ]
  },
  {
    id: "urine",
    name: "Urine Analysis",
    icon: "TestTube",
    description: "Urinalysis parameters",
    tests: [
      {
        name: "Urine pH",
        unit: "",
        min: 4.5,
        max: 8.0,
        lowMsg: "Acidic urine may indicate metabolic conditions or high protein diet.",
        normalMsg: "Urine pH is in normal range.",
        highMsg: "Alkaline urine may indicate urinary tract infection or kidney issues.",
        tips: ["Stay well hydrated", "Balanced diet helps normalize pH", "Report burning sensation", "Regular urine checks if symptomatic"]
      },
      {
        name: "Urine Specific Gravity",
        unit: "",
        min: 1.005,
        max: 1.030,
        lowMsg: "Low specific gravity indicates dilute urine, possibly over-hydration or kidney issues.",
        normalMsg: "Urine concentration is in normal range.",
        highMsg: "High specific gravity indicates concentrated urine, possibly dehydration.",
        tips: ["Drink adequate water", "Monitor urine color", "Reduce if excessively concentrated", "Check kidney function if persistent"]
      },
      {
        name: "Urine Protein",
        unit: "mg/dL",
        min: 0,
        max: 14,
        lowMsg: "No protein in urine is normal.",
        normalMsg: "Urine protein is in normal range.",
        highMsg: "Protein in urine (proteinuria) may indicate kidney damage or disease.",
        tips: ["Control blood pressure", "Manage diabetes", "Reduce salt intake", "Follow up with nephrologist if persistent"]
      }
    ]
  },
  {
    id: "electrolytes",
    name: "Electrolytes",
    icon: "Battery",
    description: "Essential minerals balance",
    tests: [
      {
        name: "Sodium",
        unit: "mEq/L",
        min: 136,
        max: 145,
        lowMsg: "Low sodium (hyponatremia) may cause confusion, fatigue, or muscle weakness.",
        normalMsg: "Sodium levels are in normal range. Fluid balance appears adequate.",
        highMsg: "High sodium (hypernatremia) may indicate dehydration and cause thirst and confusion.",
        tips: ["Monitor salt intake", "Stay properly hydrated", "Avoid excessive water intake", "Check medications affecting sodium"]
      },
      {
        name: "Potassium",
        unit: "mEq/L",
        min: 3.5,
        max: 5.0,
        lowMsg: "Low potassium may cause muscle weakness, cramps, or irregular heartbeat.",
        normalMsg: "Potassium levels are in normal range. Muscle and heart function supported.",
        highMsg: "High potassium may cause dangerous heart rhythm problems.",
        tips: ["Eat potassium-rich foods like bananas", "Monitor if on diuretics", "Avoid salt substitutes if potassium high", "Regular monitoring if kidney issues"]
      },
      {
        name: "Chloride",
        unit: "mEq/L",
        min: 98,
        max: 106,
        lowMsg: "Low chloride may indicate metabolic alkalosis or prolonged vomiting.",
        normalMsg: "Chloride levels are in normal range.",
        highMsg: "High chloride may indicate dehydration or metabolic acidosis.",
        tips: ["Stay hydrated", "Balanced electrolyte intake", "Monitor if GI issues present", "Check kidney function"]
      },
      {
        name: "Calcium",
        unit: "mg/dL",
        min: 8.5,
        max: 10.5,
        lowMsg: "Low calcium may cause muscle cramps, tingling, or bone weakness.",
        normalMsg: "Calcium levels are in normal range. Bone and muscle health supported.",
        highMsg: "High calcium may indicate parathyroid issues or other conditions.",
        tips: ["Ensure adequate vitamin D", "Dairy and leafy greens for calcium", "Weight-bearing exercise for bones", "Monitor parathyroid if levels abnormal"]
      }
    ]
  }
];

export const getAllTests = (): LabTest[] => {
  return testCategories.flatMap(category => category.tests);
};

export const findTestByName = (name: string): { test: LabTest; category: TestCategory } | null => {
  for (const category of testCategories) {
    const test = category.tests.find(t => 
      t.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(t.name.toLowerCase())
    );
    if (test) {
      return { test, category };
    }
  }
  return null;
};

export type TestStatus = 'low' | 'normal' | 'high';

export const evaluateTestResult = (value: number, test: LabTest): TestStatus => {
  if (value < test.min) return 'low';
  if (value > test.max) return 'high';
  return 'normal';
};
