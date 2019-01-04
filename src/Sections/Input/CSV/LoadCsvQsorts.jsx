import Papa from "papaparse";
import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";
import sortsDisplayText from "../logic/sortsDisplayText";
import shiftRawSortsPositive from "../logic/shiftRawSortsPositive";
import calcMultiplierArrayT2 from "../Excel/excelLogic/calcMultiplierArrayT2";
import checkUniqueParticipantNames from "../logic/checkUniqueParticipantName";

const {dialog} = require("electron").remote;
const fs = require("fs");

const localStore = store({
    buttonColor: "#d6dbe0"
});

const handleClick = () => {
    try {
        dialog.showOpenDialog(
            {
                properties: ["openFile"],
                filters: [
                    {
                        name: "CSV",
                        extensions: ["csv", "CSV"]
                    }
                ]
            },
            files => {
                try {
                    if (files !== undefined) {
                        const fileName = files[0];
                        fs.readFile(fileName, "utf-8", (error, data) => {
                            // parse file
                            const parsedFile = Papa.parse(data);
                            const lines2 = parsedFile.data;
                            let qSortPatternArray;

                            // remove the first (header) line
                            lines2.shift();

                            // parsing first line of PQMethod file to set qav variables
                            const numberSorts = lines2.length;
                            if (lines2.length < 2) {
                                throw new Error("Can't find any Q sorts in the file!");
                            }

                            // remove empty "" strings from array
                            let maxLength = lines2[0].length;
                            for (let i = 0; i < lines2[0].length - 1; i += 1) {
                                const value1 = lines2[0][i];
                                if (value1 === "") {
                                    maxLength = i;
                                    break;
                                }
                            }

                            // todo - check if other data import methods check to see if min value is above zero
                            // before doing positive shift for raw sorts
                            let minValue;
                            let arrayShiftedPositive;
                            const mainDataObject = [];
                            const respondentNames = [];
                            for (let j = 0; j < lines2.length; j += 1) {
                                lines2[j].length = maxLength;
                                const tempObj = {};
                                // get name
                                const name = lines2[j].shift();
                                // slice off name
                                lines2[j] = lines2[j].slice(1, -1);
                                tempObj.name = name;
                                respondentNames.push(name);
                                const asNumbers = lines2[j].map(Number);
                                if (j === 0) {
                                    minValue = Math.min(...asNumbers);
                                }
                                // grab last for for qSortPattern
                                qSortPatternArray = asNumbers;

                                if (minValue < 1) {
                                    arrayShiftedPositive = shiftRawSortsPositive(
                                        asNumbers,
                                        minValue
                                    );
                                } else {
                                    arrayShiftedPositive = [...asNumbers];
                                }
                                tempObj.posShiftSort = arrayShiftedPositive;
                                tempObj.rawSort = asNumbers;
                                tempObj.displaySort = lines2[j].toString();
                                mainDataObject.push(tempObj);
                            }

                            qSortPatternArray.sort((a, b) => a - b);

                            const multiplierArray = calcMultiplierArrayT2([
                                ...qSortPatternArray
                            ]);

                            const sortsDisplayTextArray = sortsDisplayText(mainDataObject);

                            const participantNames = checkUniqueParticipantNames(
                                respondentNames
                            );

                            state.setState({
                                numQsorts: numberSorts,
                                qSortPattern: qSortPatternArray,
                                numStatements: lines2[0].length,
                                respondentNames: participantNames,
                                mainDataObject,
                                sortsDisplayText: sortsDisplayTextArray,
                                multiplierArray,
                                dataOrigin: "csv",
                                sortsLoaded: true,
                                notifyDataUploadSuccess: true,
                                areQsortsLoaded: true,
                                isInputButtonGreen: state.getState("areStatementsLoaded"),
                                loadCsvQsortsButtonColor: "rgba(144,	238,	144, .6)"
                            });
                            localStore.buttonColor = "rgba(144,	238,	144, .6)";
                        });
                    }
                } catch (error) {
                    // console.log("error");
                }
            }
        );
    } catch (error) {
        // console.log(JSON.stringify("catch called"));
        state.setState({
            errorMessage: error.message,
            showErrorMessageBar: true
        });
    }
};

class LoadTxtStatementFile extends Component {
    render() {
        const loadCsvQsortsButtonColor = state.getState("loadCsvQsortsButtonColor");
        localStore.buttonColor = loadCsvQsortsButtonColor;
        return (
            <LoadTxtButton buttonColor={ localStore.buttonColor } onClick={ handleClick }>
              <p>Load CSV File</p>
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
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    background-color: ${props => props.buttonColor};
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
  }
`;
