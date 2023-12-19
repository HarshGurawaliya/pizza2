import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "@nextui-org/react";
import * as S from "../styles/style";

function Body({ messages }) {
  const [chatHistory, setChatHistory] = useState([]);
  /*
  */
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setChatHistory(messages);
      scrollToBottom();
    }
  }, [messages]);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div style={{ width: "100%" }} ref={chatContainerRef}>
      <Row css={S.BodyStyles}>
        {chatHistory.map((msg) => (
          <Col key={msg.id}>
            <Row
              css={{
                display: "flex",
                marginBottom: "0.5rem",
                marginTop: "0.5rem",
                height: "auto",
              }}
              className={msg.position}
            >
              <Row
                css={{
                  padding: "0.5rem 0.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "50%",
                  fontSize: "0.9rem",
                  color: "white",
                }}
              >
                <span id="input">{msg.text}</span>
              </Row>
            </Row>
          </Col>
        ))}
        <div ref={messagesEndRef}></div>
      </Row>
    </div>
  );
}

export default Body;
