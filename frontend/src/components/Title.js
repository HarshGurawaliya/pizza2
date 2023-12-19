import React from "react";
import { Row, Text } from "@nextui-org/react";

const titleStyle = {
  padding: "2rem",
  display: "flex",
  marginTop: "0.5rem",
  flexDirection: "column",
  width: "100%",
  height: "15rem",
  backgroundColor: "Black",
  borderRadius: "10px",
  opacity: 0.8,
  fontFamily: "'Space Grotesk', sans-serif",
 

  "@media(max-width: 768px)": {
    display: "none",
  },
  "@media(min-width: 768px)": {
    width: "80vw",
  },
};

function Title() {
  return (
    <Row css={titleStyle} justify="center">
      <Row justify="center" align="center">
        <Text
          h1
          size={40}
          css={{
            color: "white",
            fontFamily: "'Space Grotesk', sans-serif",
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
            "@media (max-width: 767px)": {},
            "@media (max-width: 500px)": {},
          }}
        >
          Internet Technology Team A Project
        </Text>
      </Row>
      <Row
        justify="center"
        css={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
        }}
      >
        <Text color="#C3F4FD" size='20'>
        Welcome to the internet  technology project of Team A Done by the following group members
        </Text>
        <Text color="#C3F4FD" size="$sm">
        - Gueguim Zangue Arnold
        </Text>
        <Text color="#C3F4FD" size="$sm">
        - Ibrahim Hassib M
        </Text>
        <Text color="#C3F4FD" size="$sm">
        - Harsh Gurawaliya
        </Text>
    
      </Row>
    </Row>
  );
}

export default Title