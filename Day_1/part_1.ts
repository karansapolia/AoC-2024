import { changeFiletoTwoLists } from "./helpers.js";

const getListDistance = async (
  file: string,
  encoding: BufferEncoding,
): Promise<number> => {
  const { leftList, rightList } = await changeFiletoTwoLists(file, encoding);

  leftList.sort();
  rightList.sort();

  let totalDistance = 0;

  leftList.forEach((elem: number, index: number) => {
    totalDistance += Math.abs(elem - rightList[index]);
  });

  console.log(totalDistance);
  return totalDistance;
};

getListDistance("./Day_1/input.txt", "utf8");
