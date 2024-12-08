import { readFileSync } from "node:fs";

const sumOfMultiplications = (
  memoryTraceFile: string,
  encoding: BufferEncoding,
): number => {
  // fetch file data
  let memoryTrace = readFileSync(memoryTraceFile, { encoding });
  memoryTrace = memoryTrace.trim();

  // main logic
  const mulBlockRegex = /mul\((\d*),(\d*)\)/g;

  let matches;
  let count = 0;
  let sumOfMultiplications = 0;
  while ((matches = mulBlockRegex.exec(memoryTrace)) !== null) {
    const multiplication = Number(matches[1]) * Number(matches[2]);
    sumOfMultiplications += multiplication;
    count++;
  }

  console.log(count);
  return sumOfMultiplications;
};

console.log(sumOfMultiplications("./Day_3/input.txt", "utf8"));
