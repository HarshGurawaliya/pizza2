export const FooterInputStyle = {
    height: "4rem",
    borderRadius: "25px",
    width: "80%",
    border: "none",
    paddingLeft: "0.5rem",
    "@media (max-width: 768px)": {
      width: "80%",
    },
  };
  export const FooterStyle = {
    width: "100%",
    height: "4rem",
    backgroundColor: "#dc3545",
    
    margin: "0",
    padding: "0",
    borderRadius: "0 0 15px 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media(max-width: 768px)": {
      width: "100%",
    },
  };
  
  export const buttonStyles = {
    width: "20%",
    height: "4rem",
    borderRadius: " 0 0 15px 0 ",
    "@media(maxWidth: 768px)": { width: "30%" },
  };
  
  export const BodyStyles = {
    width: "100%",
    height: "25rem",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: "1% 1.5rem",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "black",
  
    ".right": {
      flexDirection: "column",
      alignItems: "flex-end",
      "& > div": {
        backgroundColor: "#333333",
        borderRadius: "10px 10px 0 10px",
      },
    },
    ".left": {
      alignItems: "flex-start",
      marginTop: "0.8rem",
      "& > div": {
        backgroundColor: "brown",
        borderRadius: "10px 10px 10px 0",
      },
    },
    "&::-webkit-scrollbar": {
      width: "0",
      background: "grey",
    },
    "@media (maxWidth: 768px)": {
      width: "100%",
      height: "calc(100vh - 9rem)",
    },
  };
  