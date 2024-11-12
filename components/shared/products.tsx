"use client";
import Link from 'next/link';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  discountPercentage: number;
  stock: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>(''); 
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const data = response.data.products.map((product: any) => ({
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          description: product.description,
          discountPercentage: product.discountPercentage,
          stock: product.stock,
        }));
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Ошибка при загрузке продуктов");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleFilter = (type: string) => {
    setFilterType(type);
    setFilterOpen(false);
    let sortedProducts;
    switch (type) {
      case 'price':
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        sortedProducts = [...products].sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'stock':
        sortedProducts = [...products].sort((a, b) => b.stock - a.stock);
        break;
      default:
        sortedProducts = products;
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  if (loading) return <p style={styles.loadingText}>Загрузка продуктов...</p>;
  if (error) return <p style={styles.errorText}>{error}</p>;

  return (
    <div style={styles.productsContainer}>
      <h2 style={styles.productsTitle}>Продукты</h2>
      <div style={styles.filterContainer}>
        <button style={styles.filterButton} onClick={() => setFilterOpen(!filterOpen)}>
          Фильтровать
        </button>
        {filterOpen && (
          <div style={styles.filterMenu}>
            <button style={styles.filterOptionButton} onClick={() => handleFilter('')}>
              Главная
            </button>
            <button style={styles.filterOptionButton} onClick={() => handleFilter('price')}>
              По цене
            </button>
            <button style={styles.filterOptionButton} onClick={() => handleFilter('discount')}>
              По скидке
            </button>
            <button style={styles.filterOptionButton} onClick={() => handleFilter('stock')}>
              По количеству
            </button>
          </div>
        )}
      </div>

      <div style={styles.productsGrid}>
        {currentProducts.map((product) => {
          const discountedPrice = product.discountPercentage
            ? product.price - (product.price * product.discountPercentage) / 100
            : product.price;

          return (
            <Link href={`/product/${product.id}`} key={product.id} passHref>
              <div style={styles.productCard}>
                <div style={styles.imageContainer}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={styles.productImage}
                  />
                </div>
                <h3 style={styles.productTitle}>{product.title}</h3>
                <p style={styles.productDescription}>{product.description}</p>
                <div style={styles.priceContainer}>
                  {product.discountPercentage > 0 && (
                    <p style={styles.originalPrice}>${product.price.toFixed(2)}</p>
                  )}
                  <p style={styles.productPrice}>
                    ${discountedPrice.toFixed(2)}{" "}
                    {product.discountPercentage > 0 && (
                      <span style={styles.discount}>- {product.discountPercentage}%</span>
                    )}
                  </p>
                  <p style={styles.productStock}>В наличии: {product.stock}</p>
                </div>
                <button style={styles.buyButton}>Купить</button>
              </div>
            </Link>
          );
        })}
      </div>

      <div style={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1} style={styles.paginationButton}>
          Назад
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastProduct >= filteredProducts.length}
          style={styles.paginationButton}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  productsContainer: {
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  productsTitle: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  filterContainer: {
    textAlign: "center",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  filterButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "5px",
  },
  filterMenu: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  filterOptionButton: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "5px",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  productCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    background: "white",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
    height: "750px",
    position: "relative",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    height: "250px",
    marginBottom: "15px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "5px",
    transition: "transform 0.3s, opacity 0.3s",
    opacity: 1,
    objectFit: "contain",
  },
  productTitle: {
    fontSize: "1.4rem",
    color: "#333",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "15px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    lineClamp: 3,
    boxOrient: "vertical",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px",
  },
  originalPrice: {
    fontSize: "1rem",
    color: "#999",
    textDecoration: "line-through",
  },
  productPrice: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    color: "#e74c3c",
  },
  discount: {
    color: "#2ecc71",
  },
  productStock: {
    fontSize: "1rem",
    color: "#777",
  },
  buyButton: {
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "1.2rem",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  pagination: {
    textAlign: "center",
    marginTop: "20px",
  },
  paginationButton: {
    backgroundColor: "#9b59b6",
    color: "white",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "0 20px",
    transition: "background-color 0.3s ease",
  },
  loadingText: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#555",
  },
  errorText: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "red",
  },
};

export default Products;
