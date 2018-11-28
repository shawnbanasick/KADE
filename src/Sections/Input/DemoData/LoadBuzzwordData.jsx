import React from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import uploadBuzzwordData from "./uploadBuzzwordData";
import state from '../../../store';

const localStore = store({
    buttonColor: "#d6dbe0"
});

const handleClick = () => {
    uploadBuzzwordData();
    localStore.buttonColor = "rgba(144,	238, 144, .6)";
    state.setState({
        notifyDataUploadSuccess: true,
        isInputButtonGreen: true
    });
};

const BuzzwordButton1 = () => (
    <div>
      <LoadTxtButton id="buzzwordButton" floated="right" onClick={ () => handleClick() } buttonColor={ localStore.buttonColor }>
        Load Buzzwords
      </LoadTxtButton>
    </div>
);

export default view(BuzzwordButton1);

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
    background-color: #abafb3;
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
    background-color: rgba(144, 238, 144, 0.6);
  }
`;
