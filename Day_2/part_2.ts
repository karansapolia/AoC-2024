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

  let unSafeCounts = new Array(reports.length).fill(0);

  const safeReportsCount = reports.reduce((sum, report, reportIndex) => {
    let trend = 0;
    let isSafe = true;

    console.log("OG report ", report);

    let i = 1;
    while (i < report.length) {
      console.log("i value at start of iteration: ", i);
      // create trend when at 1st element
      if (i === 1) {
        console.log("trend checked");
        trend = report[i] - report[i - 1];
      }

      // catch unsafe cases
      if (
        trend === 0 ||
        Math.abs(report[i] - report[i - 1]) > 3 ||
        Math.abs(report[i] - report[i - 1]) < 1 ||
        (report[i] - report[i - 1] > 0 && trend <= 0) ||
        (report[i] - report[i - 1] < 0 && trend >= 0)
      ) {
        if (unSafeCounts[reportIndex] > 0) {
          isSafe = false;
          break;
        } else {
          report.splice(i, 1);
          console.log("spliced report: ", report);
          unSafeCounts[reportIndex]++;
          console.log(
            `unSafeCounts[${reportIndex}]: `,
            unSafeCounts[reportIndex],
          );
          i = 0;
        }
      }

      i++;
    }

    console.log("isSafe? ", isSafe);
    return isSafe ? sum + 1 : sum;
  }, 0);

  return safeReportsCount;
};

console.log(await numberOfSafeReport("./Day_2/input.txt", "utf8"));
