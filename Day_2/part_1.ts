import { readFile } from "node:fs/promises";

const changeFileToReports = async (
  file: string,
  encoding: BufferEncoding,
): Promise<number[][]> => {
  const data = await readFile(file, { encoding });
  // console.log(data);

  let reports = data.split("\n").map((report) => report.split(" ").map(Number));

  return reports;
};

const numberOfSafeReport = async (
  file: string,
  encoding: BufferEncoding,
): Promise<number> => {
  const reports = await changeFileToReports(file, encoding);
  console.log(reports.length);

  const safeReportsCount = reports.reduce((sum, report) => {
    let trend = 0;
    let isSafe = true;
    for (let i = 1; i < report.length; i++) {
      if (i === 1) {
        trend = report[i] - report[i - 1];
      }
      if (
        trend === 0 ||
        Math.abs(report[i] - report[i - 1]) > 3 ||
        Math.abs(report[i] - report[i - 1]) < 1 ||
        (report[i] - report[i - 1] > 0 && trend <= 0) ||
        (report[i] - report[i - 1] < 0 && trend >= 0)
      ) {
        isSafe = false;
        break;
      }
    }

    return isSafe ? sum + 1 : sum;
  }, 0);

  return safeReportsCount;
};

console.log(await numberOfSafeReport("./Day_2/input.txt", "utf8"));
