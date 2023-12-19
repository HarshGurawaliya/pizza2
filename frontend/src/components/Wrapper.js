import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Row } from "@nextui-org/react";

const socket = io("http://localhost:5000"); 

const WrapperStyles = {
  width: "40rem",
  height: "34rem",
  backgroundColor: "#EADCF8",
  borderRadius: "15px",
  marginTop: "1rem",
  marginBottom: "0.5rem",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  "@media(max-width: 768px)": {
    width: "100%",
    height: "100%",
    margin: "0",
  },
};

function Wrapper() {
  const [messages, setMessages] = useState([
    { text: "Hello ✋! Nice to see you!", position: "left" },
    { text: "I am Laurin, the AI assistant of Laurin Pasta and Pizza restaurant", position: "left" },
  ]);

  const handleInput = (msg) => {
    if (msg !== "") {
      setMessages([...messages, { text: msg, position: "right" }]);
      socket.emit("human", msg); 
    }
  };

  useEffect(() => {
    socket.on("botmes", (data) => { 
      console.log(data);
      if (data.length > 0) {
        setMessages((prevMessages) => [...prevMessages, { text: data, position: "left" }]);
      }
    });

    return () => {
      socket.off("botmes");
    };
  }, [messages]);

  return (
    <Row css={WrapperStyles}>
      <Header />
      <Body messages={messages} />
      <Footer handleInput={handleInput} />
    </Row>
  );
}

export default Wrapper;
