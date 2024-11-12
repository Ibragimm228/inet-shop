import React from "react";

const Contacts = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>Контакты</h1>
        {/*контакты */}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    width: "100%",
    minHeight: "100vh",
    background: "url('/images/contacts-bg.jpg') no-repeat center center fixed",
    backgroundSize: "cover", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.8)", 
    textAlign: "center",
  },
  title: {
    fontSize: "3rem", 
    color: "black",
    marginBottom: "20px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "1.2rem",
    backgroundColor: "#0288d1", 
    color: "white", 
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Contacts;
