import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  stock: number; 
  discountPercentage: number;
}

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://dummyjson.com/products/${id}`);
          setProduct(response.data);
        } catch (err) {
          setError('Ошибка при загрузке продукта');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  if (!product) return <p>Продукт не найден</p>;

  return (
    <div style={styles.productDetailContainer}>
      <button style={styles.backButton} onClick={() => router.push('/')}>
        <FaArrowLeft size={24} color="#333" />
      </button>

      <div style={styles.productCard}>
        <img src={product.thumbnail} alt={product.title} style={styles.productImage} />
        <div style={styles.productInfo}>
          <h1 style={styles.productTitle}>{product.title}</h1>
          <p style={styles.productDescription}>{product.description}</p>
          <p style={styles.productPrice}>Цена: ${product.price.toFixed(2)}</p>
          {product.discountPercentage > 0 && (
            <p style={styles.productDiscount}>Скидка: {product.discountPercentage}%</p>
          )}
          <p style={styles.productQuantity}>В наличии: {product.stock}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  productDetailContainer: {
    padding: '20px',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    transition: 'background 0.3s',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  productInfo: {
    textAlign: 'center',
  },
  productTitle: {
    fontSize: '1.6rem',
    marginBottom: '10px',
  },
  productDescription: {
    color: '#555',
    fontSize: '0.9rem',
    marginBottom: '10px',
    height: '60px',
    overflow: 'hidden',
  },
  productPrice: {
    fontSize: '1.2rem',
    color: '#d9534f',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  productDiscount: {
    fontSize: '1rem',
    color: '#ffc107',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  productQuantity: {
    fontSize: '1rem',
    color: '#333',
  },
};

export default ProductDetail;
