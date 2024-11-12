import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <a style={styles.logo}>inet-shop</a>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link href="/new-arrivals">Новинки</Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/categories">Категории</Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/discounts">Скидки</Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/contacts">Контакты</Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/about-us">О нас</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    width: "100%", 
    backgroundColor: "#333", 
    padding: "20px 0", 
    boxSizing: "border-box",
    position: "fixed", 
    top: 0, 
    left: 0,
    zIndex: 1000, 
  },
  container: {
    width: "100%",
    maxWidth: "1200px", 
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between", 
    alignItems: "center",
    padding: "0 20px", 
  },
  logo: {
    fontSize: "2rem",
    color: "#fff",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "20px",
  },
};

export default Header;
