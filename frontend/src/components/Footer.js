import { Button, Row } from "@nextui-org/react";
import * as S from "../styles/style";
import { useState } from "react";

const Footer = ({ handleInput }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  

  const handleSendClick = () => {
    handleInput(inputValue);
    setInputValue("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };
  return (
    <Row css={S.FooterStyle}>
      <input
        style={S.FooterInputStyle}
        type="text"
        id="message"
        name="message"
        placeholder="Type your message"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        color="success"
        size="xs"
        css={S.buttonStyles}
        onClick={handleSendClick}
      >
        Send
      </Button>
    </Row>
   
  );
};

export default Footer;
