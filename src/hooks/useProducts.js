import { useEffect, useState } from "react";
import { productService } from "../api/services/product.service";

export const useProducts = (page, limit, status = "true") => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await productService.getProducts(page, limit, status);
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, status]);

  return { products, loading, error };
};

export const useProductById = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setProduct(null);

      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export const useActiveProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await productService.getActiveProducts();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveProducts();
  }, []);

  return { products, loading, error };
};

export const useProductsByCategory = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await productService.getProductsByCategory(category);
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return { products, loading, error };
};
