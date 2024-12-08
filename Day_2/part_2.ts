import { readFile } from "node:fs/promises";

const changeFileToReports = async (
  file: string,
  encoding: BufferEncoding,
): Promise<number[][]> => {
  const data = await readFile(file, { encoding });

  const reports = data
    .trim()
    .split("\n")
    .map((report: string) => report.split(" ").map(Number));

  return reports;
};

const isSafe = (report: number[]) => {
  let increasing = null; // Initially null, then set to true or false

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false; // Check absolute diff

    if (increasing === null) {
      increasing = diff > 0; // Set based on first difference
    } else if ((increasing && diff < 0) || (!increasing && diff > 0)) {
      return false; // Change in direction, not safe
    }
  }
  return true; // If we get here, it's safe
};

const numberOfSafeReport = async (
  file: string,
  encoding: BufferEncoding,
): Promise<number> => {
  const reports = await changeFileToReports(file, encoding);
  let safeCount = 0;

  for (const report of reports) {
    if (isSafe(report)) {
      safeCount++;
      continue;
    }

    for (let i = 0; i < report.length; i++) {
      const modifiedReport = [...report];
      modifiedReport.splice(i, 1);
      if (isSafe(modifiedReport)) {
        safeCount++;
        break;
      }
    }
  }

  return safeCount;
};

console.log(await numberOfSafeReport("./Day_2/input.txt", "utf8"));
