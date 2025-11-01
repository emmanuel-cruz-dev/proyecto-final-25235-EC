import { useEffect, useState } from "react";
import { productService } from "../api/services/product.service";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      productService.getProducts().then((data) => {
        setProducts(data);
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { products, loading, error };
};
