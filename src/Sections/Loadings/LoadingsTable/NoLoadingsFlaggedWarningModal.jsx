import React from "react";
import { view } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import loadingState from "../../GlobalState/loadingState";
import outputState from "../../GlobalState/outputState";
const clone = require("rfdc")();

const handleClose = () => {
  outputState.showNoLoadingsFlaggedWarningModal = false;
  outputState.showOutputFactorSelection = false;
  outputState.showFactorCorrelationsTable = false;
  outputState.showStandardErrorsDifferences = false;
  outputState.showFactorCharacteristicsTable = false;
  outputState.showDownloadOutputButtons = false;
  outputState.shouldDisplayFactorVizOptions = false;
  outputState.displayFactorVisualizations = false;
  loadingState.sendDataToOutputButtonColor = "#d6dbe0";
};

const NoLoadingsFlaggedWarningModal = () => {
  const showNoLoadingsFlaggedWarningModal =
    outputState.showNoLoadingsFlaggedWarningModal;
  // getState
  const factorsWithoutLoading = clone(outputState.factorsWithoutLoading);
  if (showNoLoadingsFlaggedWarningModal) {
    return (
      <Modal
        dimmer={"blurring"}
        open={showNoLoadingsFlaggedWarningModal}
        onClose={handleClose}
      >
        <Header content="Error Checking" />
        <Modal.Content>
          <span style={{ fontSize: 30, display: "block" }}>
            A factor without a flagged loading was selected.
          </span>
          <span style={{ fontSize: 22, marginTop: 20, display: "block" }}>
            Problem factors: {factorsWithoutLoading}
          </span>
        </Modal.Content>
        <Modal.Actions>
          <Button
            id="noLoadingsFlaggedModalGotItButton"
            color="green"
            style={{ margin: 15 }}
            floated="right"
            onClick={handleClose}
            inverted
          >
            Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
  return null;
};
export default view(NoLoadingsFlaggedWarningModal);
