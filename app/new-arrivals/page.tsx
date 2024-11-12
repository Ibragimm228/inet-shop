import React from "react";

const NewArrivals = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>Новинки</h1>
        {/* новинки */}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #6a1b9a, #8e24aa)",
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
    background: "white", 
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
    backgroundColor: "#8e24aa", 
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default NewArrivals;
