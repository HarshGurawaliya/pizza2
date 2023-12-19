import React from "react";
import Title from "./Title";
import Wrapper from "./Wrapper";
import { Container } from "@nextui-org/react";

const mainWrapperStyle = {
  minWidth: "100%",
  // width: "100% auto",
  height: "100% auto",
  minHeight: "100vh",
  backgroundColor: "#EDF5FF",
  padding: "1rem",
  margin: "0",
  display: "flex",
  justifyContent: "center",

  "@media(min-width: 768px)": {
    boxSizing: "border-box",
    width: "100%",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

function MainWrapper() {
  return (
    <Container css={mainWrapperStyle}>
      <Title />
      <Wrapper />
    </Container>
  );
}

export default MainWrapper;
