const NumberFormater = (num: number) => {
  const input: string[] = String(num).split("").reverse();
  let resultString = "";
  if (input.length <= 3) return num;
  let i = 1;
  let firstThree = false;
  for (let ch = 0; ch < input.length; ch++) {
    resultString = resultString + input[ch];
    if (i == 3 && !firstThree) {
      resultString = resultString + ",";
      firstThree = true;
      i = 1;
      continue;
    }
    if (firstThree && i == 2 && ch < input.length - 1) {
      resultString = resultString + ",";
      i = 1;
      continue;
    }
    i++;
  }

  resultString = resultString.split("").reverse().join("");
  // console.log("resultString: ", resultString);

  return resultString;
};

export default NumberFormater;
