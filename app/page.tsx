import Products from "@/components/shared/products";  

export default function Home() {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <Products />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f7f7f7",
  },
  contentContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
};
