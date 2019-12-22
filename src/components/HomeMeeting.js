import React, { Component } from "react";

import {
  EuiPanel,
  EuiText,
  EuiBadge,
  EuiFlexItem,
  EuiFlexGroup
} from "@elastic/eui";
import AudioPlayer from "./AudioPlayer";

// import { IoMdCalendar } from "react-icons/io";
import { FiCalendar, FiClock } from "react-icons/fi";

import { EuiSpacer } from "@elastic/eui";

export default class HomeMeeting extends Component {
  render() {
    const badges = [
      "default",
      "hollow",
      "primary",
      "secondary",
      "accent",
      "warning",
      "danger",
      "#000",
      "#fea27f"
    ];
    return (
      <EuiPanel paddingSize="s">
        <EuiText>
          <h3>My first meeting</h3>
        </EuiText>
        <EuiSpacer size="xs" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <FiCalendar
            style={{
              height: "17px",
              width: "17px"
            }}
          />
          <span style={{ marginLeft: "0.25rem" }}> {"21th Dec 2019"} </span>

          <FiClock
            style={{
              height: "17px",
              width: "17px",
              marginLeft: "1.2rem"
            }}
          />

          <span style={{ marginLeft: "0.25rem" }}> {"3:26"} </span>
        </div>
        <EuiSpacer size="s" />                                                                                                                            

        <AudioPlayer />
        <EuiSpacer size="s" />

        <EuiFlexGroup wrap responsive={false} gutterSize="xs">
          {badges.map(badge => (
            <EuiFlexItem grow={false} key={badge}>
              <EuiBadge color={"#c7c7c7"}>{badge}</EuiBadge>
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>

        <EuiSpacer size="s" />

        <EuiText>
          <p>
            This planet has - or rather had - a problem, which was this: most of
            the people living on it were unhappy for pretty much of the time.
            Many solutions were suggested for this problem, but most of these
            were largely concerned with the movements of small green pieces of
            paper, which is odd because on the whole it was not the small green
            pieces of paper that were unhappy.
          </p>
        </EuiText>
      </EuiPanel>
    );
  }
}
