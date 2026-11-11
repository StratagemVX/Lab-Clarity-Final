import { useState, useEffect } from "react";
import { LabTest, TestStatus, evaluateTestResult } from "@/data/labTests";

export interface TestRecord {
  id: string;
  testName: string;
  value: number;
  unit: string;
  status: TestStatus;
  date: string;
  timestamp: number;
  min: number;
  max: number;
}

const STORAGE_KEY = "labguide-test-history";

export function createTestRecordId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}`;
}

export const useTestHistory = () => {
  const [history, setHistory] = useState<TestRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveHistory = (records: TestRecord[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    setHistory(records);
  };

  const addRecord = (test: LabTest, value: number) => {
    const status = evaluateTestResult(value, test);
    const newRecord: TestRecord = {
      id: createTestRecordId(),
      testName: test.name,
      value,
      unit: test.unit,
      status,
      date: new Date().toLocaleDateString(),
      timestamp: Date.now(),
      min: test.min,
      max: test.max,
    };
    
    const updated = [newRecord, ...history].slice(0, 100); // Keep last 100 records
    saveHistory(updated);
    return newRecord;
  };

  const deleteRecord = (id: string) => {
    const updated = history.filter(r => r.id !== id);
    saveHistory(updated);
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  const getTestHistory = (testName: string) => {
    return history
      .filter(r => r.testName === testName)
      .sort((a, b) => a.timestamp - b.timestamp);
  };

  const getRecentTests = (limit = 10) => {
    return history.slice(0, limit);
  };

  return {
    history,
    addRecord,
    deleteRecord,
    clearHistory,
    getTestHistory,
    getRecentTests,
  };
};
