import { view, store } from "react-easy-state";
import React, { Component } from "react";
import styled from "styled-components";
import state from "../../../store";
import convertJSONToData from './convertJSONToData';
// import { sortsDisplayText } from "../logic/sortsDisplayText";
// import shiftRawSortsPositive from "../logic/shiftRawSortsPositive";
// import calcMultiplierArrayT2 from "../logic/excelLogic/calcMultiplierArrayT2";
// import checkUniqueParticipantNames from "../logic/checkUniqueParticipantName";

const { dialog } = require("electron").remote;
const fs = require("fs");

const localStore = store({ buttonColor: "#d6dbe0" });

const handleClick = () => {
  try {
    dialog.showOpenDialog(
      {
        properties: ["openFile"],
        filters: [{ name: "JSON", extensions: ["json", "JSON"] }]
      },
      files => {
        if (files !== undefined) {
          const fileName = files[0];
          fs.readFile(fileName, "utf-8", (err, data) => {
            
            const results = JSON.parse(data);

                // console.log("results: " + (JSON.stringify(results)));

                const resultsArray = [];
                for (let key in results) {
                    if (results.hasOwnProperty(key)) {
                        resultsArray.push(results[key]);
                    }
                }

                // transform to md array
                // todo - this is the source of the extra brackets
                const csvData = convertJSONToData(results);

                // get options for id selection dropdown
                // console.log(JSON.stringify(csvData[0][0]));
                const jsonParticipantId = [];
                const columnHeaders = csvData[0][0];
                for (let i = 0; i < columnHeaders.length; i+=1) {
                    const tempObj = {};
                    tempObj.key = i + 1;
                    tempObj.text = columnHeaders[i];
                    tempObj.value = columnHeaders[i];
                    jsonParticipantId.push(tempObj);
                }

                store.setState({
                    jsonParticipantId,
                    showJsonParticipantIdDropdown: true,
                    csvData,
                    jsonObj: results,
                    dataOrigin: "json",
                    showJsonFileLoadedMessage: true
                });
            localStore.buttonColor = "rgba(144,	238,	144, .6)";
          });
        }
      }
    );
  } catch (error) {
    state.setState({
      csvErrorMessage1: error.message,
      showCsvErrorModal: true
    });
  }
};

class LoadTxtStatementFile extends Component {
  render() {
    return (
      <LoadTxtButton
        buttonColor={localStore.buttonColor}
        onClick={() => handleClick()}
      >
        <p>Load JSON File</p>
      </LoadTxtButton>
    );
  }
}

export default view(LoadTxtStatementFile);

const LoadTxtButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 60px;
  width: 240px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 3px 3px 0 black;

  &:hover {
    background-color: white;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
  }
`;