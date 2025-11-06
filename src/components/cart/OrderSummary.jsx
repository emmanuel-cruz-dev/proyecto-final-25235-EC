import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useCheckoutOrder } from "../../hooks/useCheckoutOrder";
import CheckoutModal from "../modals/CheckoutModal";
import { formatPrice } from "../../utils/utils";

function OrderSummary() {
  const { cart, getCartTotal } = useCart();
  const {
    showModal,
    orderData,
    calculateTotal,
    handleCheckout,
    handleCloseModal,
  } = useCheckoutOrder();

  return (
    <>
      <Col lg={4}>
        <Card
          className="shadow-sm border-0"
          style={{ top: "100px", position: "sticky" }}
        >
          <Card.Body>
            <h4 className="mb-4">Resumen del pedido</h4>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold">{formatPrice(getCartTotal())}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Envío</span>
              <span className="fw-semibold">
                {getCartTotal() > 150 ? (
                  <span className="text-success">Gratis</span>
                ) : (
                  "$5.00"
                )}
              </span>
            </div>

            {getCartTotal() > 0 && getCartTotal() < 150 && (
              <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                Envío gratis a partir de $150
              </small>
            )}

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-5 text-primary">
                ${formatPrice(calculateTotal())}
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-100 mb-3"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Finalizar compra
            </Button>

            <Link to="/products" className="text-decoration-none">
              <Button
                variant="outline-secondary py-2"
                size="sm"
                className="w-100"
              >
                <ArrowLeft size={16} className="me-2" />
                Seguir comprando
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>

      {orderData && (
        <CheckoutModal
          show={showModal}
          onHide={handleCloseModal}
          orderTotal={orderData.total}
          itemsCount={orderData.itemsCount}
        />
      )}
    </>
  );
}

export default OrderSummary;
