import { readFile } from "node:fs/promises";

/**
 *
 * @param {string} file Give string path to the file
 * @param {BufferEncoding} encoding The encoding of the file
 * @returns string output of the file
 */
export const changeFiletoTwoLists = async (
  file: string,
  encoding: BufferEncoding,
): Promise<{ leftList: number[]; rightList: number[] }> => {
  let leftList = [];
  let rightList = [];

  const data = await readFile(file, { encoding });

  const eachLineArr = data.split("\n");

  for (const element of eachLineArr) {
    let aLine = element.split("   ");
    leftList.push(Number(aLine[0]));
    rightList.push(Number(aLine[1]));
  }

  return { leftList, rightList };
};
