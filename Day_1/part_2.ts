import { changeFiletoTwoLists } from "./helpers.js";

const similarityScore = async (file: string, encoding: BufferEncoding) => {
  const { leftList, rightList } = await changeFiletoTwoLists(file, encoding);

  leftList.sort();
  rightList.sort();

  const individualScores = leftList.map(
    (leftListElem: number, index: number) =>
      leftListElem *
      rightList.filter(
        (rightListElem: number) => rightListElem === leftListElem,
      ).length,
  );

  const similarityScore = individualScores.reduce((sum, curr) => sum + curr, 0);
  console.log(similarityScore);
  return similarityScore;
};

similarityScore("./Day_1/input.txt", "utf8");
