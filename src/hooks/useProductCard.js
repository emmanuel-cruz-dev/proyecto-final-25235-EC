import { useCart } from "./useCart";

export const useProductCard = ({
  id,
  title,
  price,
  category,
  description,
  image,
}) => {
  const { handleAddToCart } = useCart();

  const handleAddToCartClick = () => {
    const product = {
      id,
      title,
      price,
      category,
      description,
      image,
    };
    handleAddToCart(product);
  };

  return { handleAddToCartClick };
};
