import React, { Component } from "react";
import axios from "axios";
import uuidv4 from "uuid/v4";

import moment from "moment";

import {
  EuiDatePicker,
  EuiFormRow,
  EuiHorizontalRule,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCard,
  EuiIcon,
  EuiFilePicker,
  EuiFormControlLayout,
  EuiProgress,
  EuiButton,
  EuiButtonEmpty
} from "@elastic/eui";
import HomeMeeting from "./HomeMeeting";

import { FiPlusCircle } from "react-icons/fi";
import { EuiText } from "@elastic/eui";
import { EuiSpacer } from "@elastic/eui";
import { navigate } from "@reach/router";

const BASE_URL = "http://192.168.43.254:9000/";
export default class HomeBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      isModalVisible: false,
      files: {},
      fileUploadView: false,
      meetingName: "My Awesome Meeting",
      ProgressValue: 0
    };
  }

  startMeeting = () => {
    let meetingID = uuidv4();
    let groupID = uuidv4();
    let meetingData = {
      meetingID,
      groupID
    }
    this.props.setMeetingGroupID(meetingID, groupID);
    var bodyFormData = new FormData();
    bodyFormData.set("meeting_id", meetingID);
    bodyFormData.set("group_id", groupID);

    axios({
      method: "post",
      url: BASE_URL + "start/",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then(response => {
      console.log("response");

      console.log(response);

      localStorage.setItem('meetingData', JSON.stringify(meetingData));

      navigate("/recording");
    });
  };

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleMeetingNameChange = e => {
    this.setState({
      meetingName: e.target.value
    });
  };

  onChangeFile = files => {
    this.setState({
      files: files
    });

    if (files.length > 0) {
      this.setState({
        fileUploadView: true
      });
    }
    console.log("dropped file", files);
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  render() {
    let modal;

    if (this.state.isModalVisible) {
      if (this.state.fileUploadView === false) {
        modal = (
          <EuiOverlayMask>
            <EuiModal onClose={this.closeModal}>
              <EuiModalHeader>
                <EuiModalHeaderTitle>What to do ?</EuiModalHeaderTitle>
              </EuiModalHeader>

              <EuiModalBody>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiFlexItem key={1} grow={true}>
                      <EuiCard
                        icon={<EuiIcon size="xxl" type="notebookApp" />}
                        title={`Start Meeting`}
                        isDisabled={false}
                        description="Click to start Meeting and being Awesome."
                        onClick={() => {
                          // navigate("recording")
                          this.startMeeting();
                        }}
                      />
                    </EuiFlexItem>
                  </EuiFlexItem>
                  <EuiFlexItem grow={true}>
                    <EuiFilePicker
                      id="asdf2"
                      // multiple
                      initialPromptText={
                        <EuiFlexGroup>
                          <EuiFlexItem>
                            <EuiText textAlign="center">
                              <h3> Drop file to get transcribe</h3>
                            </EuiText>

                            <EuiSpacer size="s" />
                            <h6>
                              Get awesome transcibe and analysis from audio
                            </h6>
                          </EuiFlexItem>
                        </EuiFlexGroup>
                      }
                      onChange={files => {
                        this.onChangeFile(files);
                      }}
                      display="large"
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiModalBody>

              {/* <EuiModalFooter>
                  <EuiButtonEmpty onClick={this.closeModal}>Cancel</EuiButtonEmpty>
    
                  <EuiButton onClick={this.closeModal} fill>
                    Save
                  </EuiButton>
                </EuiModalFooter> */}
            </EuiModal>
          </EuiOverlayMask>
        );
      } else {
        modal = (
          <EuiOverlayMask>
            <EuiModal onClose={this.closeModal}>
              <EuiModalHeader>
                <EuiModalHeaderTitle>
                  <EuiFormControlLayout icon="pencil">
                    <input
                      type="text"
                      placeholder="Please Add Meeting Name"
                      value={this.state.meetingName}
                      onChange={this.handleMeetingNameChange}
                      className="euiFieldText"
                      style={{ paddingLeft: "32px" }}
                    />
                  </EuiFormControlLayout>
                </EuiModalHeaderTitle>
              </EuiModalHeader>

              <EuiModalBody>
                <EuiText>
                  <h3> Transcribe From :</h3>
                </EuiText>

                <div style={{ wordWrap: "break-word" }}>
                  {this.state.files[0].name}
                </div>

                <EuiSpacer size="l" />

                <EuiProgress
                  value={this.state.ProgressValue}
                  max={100}
                  size="xs"
                />
              </EuiModalBody>

              <EuiModalFooter>
                <EuiButtonEmpty
                  onClick={() => {
                    this.setState({ files: [], fileUploadView: false });
                    this.closeModal();
                  }}
                >
                  Cancel
                </EuiButtonEmpty>

                <EuiButton
                  onClick={() => {
                    // File Upload Fxn
                    this.closeModal();
                  }}
                  fill
                >
                  Upload
                </EuiButton>
              </EuiModalFooter>
            </EuiModal>
          </EuiOverlayMask>
        );
      }
    }
    return (
      <div>
        <EuiFormRow label="Select a date">
          <EuiDatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            dateFormat="Do MMM YYYY"
          />
        </EuiFormRow>
        {modal}
        <EuiHorizontalRule />
        <HomeMeeting />

        <FiPlusCircle
          onClick={this.showModal}
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            height: "40px",
            width: "40px",
            zIndex: "5"
          }}
        />
      </div>
    );
  }
}
