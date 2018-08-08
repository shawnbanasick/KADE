import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import UnforcedQsortDesignInput from "./CSV/UnforcedQsortDesignInput";
import ProjectNameInput from "./CSV/ProjectNameInput";
import CsvStatementCard from "./CSV/CsvStatementCard";
// import CsvSuccessfulLoadBar from "./CSV/CsvSuccessfulLoadBar";
import JsonQsortsCard from "./JSON/JsonQsortsCard";
// import IdDropdownSelect from "./JSON/IdDropdownSelect";
import Dropdown from '../../Utils/Dropdown';

class JsonPanel extends Component {
  render() {
    return (
      <DataWindow>
        <Header>Load both a statements TXT file and Q sorts CSV file.</Header>
        <CardHolder>
          <CsvStatementCard />
          <JsonQsortsCard />
          <ProjectNameInput />
          <Dropdown options={ ['Strawberry Cream', 'Chocolate Flakes', 'Marshmallow Sprinkles'] } />
          <ForcedUnforcedRadio />
          <UnforcedQsortDesignInput />
          { /* <IdDropdownSelect /> */ }
          { /* <CsvSuccessfulLoadBar /> */ }
        </CardHolder>
      </DataWindow>
      );
  }
}

export default view(JsonPanel);

const DataWindow = styled.div`
  height: 100%;
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 115px 120px 130px;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;