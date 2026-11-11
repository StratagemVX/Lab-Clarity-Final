import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { evaluateTestResult, findTestByName, getAllTests } from "./labTests";

const repoRoot = resolve(__dirname, "../..");

describe("labTests evaluation and lookup", () => {
  it("classifies low, normal, and high lab values accurately", () => {
    const hemoglobin = findTestByName("Hemoglobin");
    expect(hemoglobin).not.toBeNull();
    expect(evaluateTestResult(10, hemoglobin!.test)).toBe("low");
    expect(evaluateTestResult(14, hemoglobin!.test)).toBe("normal");
    expect(evaluateTestResult(19, hemoglobin!.test)).toBe("high");
  });

  it("includes comprehensive reference ranges", () => {
    const tests = getAllTests();
    expect(tests.length).toBeGreaterThan(5);
    expect(findTestByName("Unknown Panel XYZ")).toBeNull();
  });
});

describe("repository hygiene", () => {
  it("ignores .env files and documents valid container command", () => {
    const gitignore = readFileSync(resolve(repoRoot, ".gitignore"), "utf8");
    expect(gitignore).toMatch(/^\.env$/m);
    expect(gitignore).toMatch(/^\.env\.\*$/m);

    const dockerfile = readFileSync(resolve(repoRoot, "Dockerfile"), "utf8");
    expect(dockerfile).not.toContain('CMD ["npm", "start"]');
  });
});
