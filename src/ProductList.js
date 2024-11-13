import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description || !newProduct.price)
      return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        newProduct
      );
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setNewProduct({ name: "", description: "", price: "" });
      setError(null);
    } catch (err) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // Update product details
  const updateProduct = async (e) => {
    e.preventDefault();
    if (
      !editProduct.id ||
      !editProduct.name ||
      !editProduct.description ||
      !editProduct.price
    )
      return;
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/products/${editProduct.id}`,
        editProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === response.data._id ? response.data : product
        )
      );
      setEditProduct({ id: "", name: "", description: "", price: "" });
      setError(null);
    } catch (err) {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      setError(null);
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="crud-container">
      <h1 className="greeting">Product List</h1>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="form-container">
        <form className="form" onSubmit={addProduct}>
          <input
            className="input"
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            className="input"
            type="text"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            className="input"
            type="number"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <button className="button submit-button" type="submit">
            Add Product
          </button>
        </form>
      </div>

      {editProduct.id && (
        <div className="form-container">
          <form className="form" onSubmit={updateProduct}>
            <input
              className="input"
              type="text"
              placeholder="Product Name"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
            <input
              className="input"
              type="text"
              placeholder="Product Description"
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({ ...editProduct, description: e.target.value })
              }
            />
            <input
              className="input"
              type="number"
              placeholder="Product Price"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />
            <button className="button" type="submit">
              Update Product
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      console.log(product._id);
                      const updatedProduct = { ...product, id: product._id };
                      setEditProduct(updatedProduct);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
