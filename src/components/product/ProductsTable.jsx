import React from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useProducts } from "../../hooks/useProducts";
import { formatPrice } from "../../utils/utils";
// import PaginationItem from "../common/PaginationItem";

function UpdateProductModal({ show, onHide, product }) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>
      <figure className="my-4 w-25 mx-auto">
        <img className="img-fluid" src={product.image} alt="Producto" />
      </figure>
      <Modal.Body>
        <form className="d-grid grid-cols-2 gap-2">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={product.name}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={product.price}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="text"
              className="form-control"
              id="stock"
              value={product.stock}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="isActive">Estado</label>
            <input
              type="text"
              className="form-control"
              id="isActive"
              value={product.isActive ? "Activo" : "Inactivo"}
              disabled
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary">Guardar</Button>
      </Modal.Footer>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="email" placeholder={product.name} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" placeholder={product.price} />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="formGridStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" placeholder={product.stock} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" placeholder={product.rating} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBrand">
            <Form.Label>Marca</Form.Label>
            <Form.Control type="text" placeholder={product.brand} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              defaultValue={product.isActive ? "Activo" : "Inactivo"}
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}

function ProductsTable() {
  const { products, loading, error } = useProducts(1, 10, "all");
  const [showModal, setShowModal] = React.useState(false);
  const [product, setProduct] = React.useState({});

  const handleModalShow = (product) => {
    setShowModal(true);
    setProduct(product);
  };

  const handleModalHide = () => {
    setShowModal(false);
  };

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2 className="mb-4">Productos</h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center mb-2 ">
          <label className="form-label">Buscar producto</label>
          <input className="form-control ml-2" type="text" />
        </div>
        <button onClick={() => handleModalShow({})} className="btn btn-primary">
          Crear producto
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="checkAll" id="checkAll" />
            </th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <tr key={`placeholder-${index}`}>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
            ))
          ) : error ? (
            <tr>
              <td colSpan={6}>Error al cargar productos</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <input type="checkbox" name="checkAll" id="checkAll" />
                </td>
                <td>{product.name}</td>
                <td>${formatPrice(product.price)}</td>
                <td>{product.stock}</td>
                <td>{product.isActive ? "Activo" : "Inactivo"}</td>
                <td>
                  <button
                    onClick={() => handleModalShow(product)}
                    className="btn btn-primary"
                  >
                    Editar
                  </button>
                  <button className="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <footer className="d-flex justify-content-center">
        <p>Los productos inactivos no se muestran a los clientes</p>
        {showModal && (
          <UpdateProductModal
            show={showModal}
            onHide={handleModalHide}
            product={product}
          />
        )}
        {/* <PaginationItem
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
        /> */}
      </footer>
    </section>
  );
}

export default ProductsTable;
