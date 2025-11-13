import { useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProducts";
import ProductSlideList from "../components/product/ProductSlideList";
import ProductDetailsCard from "../components/product/ProductDetailsCard";

function Product() {
  const { id } = useParams();
  const idNumber = Number(id);
  const { product, loading } = useProductById(idNumber);

  return (
    <section>
      <ProductDetailsCard product={product} isLoading={loading} />
      <article>
        <ProductSlideList title="Productos Destacados" />
      </article>
    </section>
  );
}

export default Product;
