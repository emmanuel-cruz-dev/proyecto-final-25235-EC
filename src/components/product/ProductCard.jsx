import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { formatPrice } from "../../utils/utils";

function ProductCard({ id, name, price, description, image, isLoading }) {
  if (isLoading) return <p>Loading...</p>;

  return (
    <Card>
      <Link
        to={`/product/${id}`}
        className="text-decoration-none card__img-link"
        style={{
          background: "linear-gradient(135deg, #f6f8fa, #dcecfb)",
        }}
        title="Ver más información"
      >
        <Card.Img
          className="p-4 card__img"
          variant="top"
          src={image}
          alt={name}
          loading="lazy"
          style={{
            height: "15rem",
            objectFit: "contain",
            filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))",
          }}
        />
      </Link>
      <Card.Body>
        <Card.Title className="line-clamp-1">{name}</Card.Title>
        <Card.Text
          className="mb-1"
          style={{ color: "blue", fontSize: "1.2rem", fontWeight: "500" }}
        >
          ${formatPrice(price)}
        </Card.Text>
        <Card.Text className="line-clamp-2 text-secondary">
          {description}
        </Card.Text>
        <Button
          variant="primary"
          className="mt-3 d-inline-flex justify-content-center gap-2 px-4 w-100"
        >
          Añadir al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
