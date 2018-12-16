import store from "../../../store";
// import addDistinguishingSymbolsToData from "./addDistinguishingSymbolsToData";

const data = () => {
  console.log(JSON.stringify("prepare data for factor viz called"));

  // if first time -> get data from output function
  let outputForDataViz = store.getState("outputForDataViz2");
  // const numbersHaveBeenAppended = store.getState("numbersHaveBeenAppended");

  if (outputForDataViz.length === 0) {
    outputForDataViz = store.getState("outputForDataViz");
  }

  // append statement numbers
  // const options = store.getState("factorVizOptions");
  // const shouldAppend = options.willPrependStateNums;
  // console.log(`append numbers?: ${  JSON.stringify(shouldAppend)}`);

  // if (shouldAppend === true && numbersHaveBeenAppended === false) {
  for (let j = 0; j < outputForDataViz.length; j += 1) {
    for (let k = 0; k < outputForDataViz[j].length; k += 1) {
      const stateNum = outputForDataViz[j][k].statement;
      const statement = outputForDataViz[j][k].sortStatement;
      outputForDataViz[j][k].sortStatementAndNums = `${stateNum}. ${statement}`;
    }
    // console.log('output for data viz: ' + JSON.stringify(outputForDataViz));
  }
  // store.setState({
  //   numbersHaveBeenAppended: true
  // });
  // }
  // if (shouldAppend === false && numbersHaveBeenAppended === true) {
  //   outputForDataViz = store.getState("outputForDataViz");
  //   store.setState({
  //     numbersHaveBeenAppended: false
  //   });
  // }

  // sort by sort values, then by Z-scores
  for (let i = 0; i < outputForDataViz.length; i += 1) {
    outputForDataViz[i].sort((a, b) => {
      if (a.sortValue > b.sortValue) {
        return 1;
      }
      if (a.sortValue < b.sortValue) {
        return -1;
      }
      // secondary sorting to make it easier to check results - high zscore to low
      if (a.zScore < b.zScore) {
        return 1;
      }
      if (a.zScore > b.zScore) {
        return -1;
      }
      return 0;
    });
  }
  // store.setState({
  //   outputForDataViz2: outputForDataViz
  // });

  // console.log(`dataviz2: ${JSON.stringify(outputForDataViz)}`);

  // console.trace();

  return outputForDataViz;
};

export default data;
