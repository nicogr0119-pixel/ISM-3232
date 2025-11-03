"use client";

import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import CartSummary from "./CartSummary";
import StatusMessage from "./StatusMessage";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add to cart and decrease stock
  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p))
    );
    setCart((prev) => [...prev, { ...product }]);
  };

  // Remove last occurrence of product from cart
  const removeFromCart = (productId) => {
    const itemToRemove = cart.find((p) => p.id === productId);
    if (!itemToRemove) return;

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + 1 } : p))
    );

    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === productId);
      if (index === -1) return prev;
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  // Reset cart and restore stock
  const resetCart = () => {
    setProducts((prev) => {
      const stockMap = cart.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1;
        return acc;
      }, {});
      return prev.map((p) => ({
        ...p,
        stock: p.stock + (stockMap[p.id] || 0),
      }));
    });
    setCart([]);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const priceFilter = maxPrice === "" ? true : p.price <= Number(maxPrice);
    const categoryFilter = category ? p.category === category : true;
    return priceFilter && categoryFilter;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Filters & Cart Column */}
      <div className="md:col-span-1 space-y-4">
        <CategoryFilter value={category} onChange={setCategory} />
        <PriceFilter value={maxPrice} onChange={setMaxPrice} />
        <CartSummary
          cart={cart}
          removeFromCart={removeFromCart}
          resetCart={resetCart}
        />
      </div>

      {/* Products Column */}
      <div className="md:col-span-3">
        {loading && <StatusMessage type="loading" />}
        {error && <StatusMessage type="error" message={error} />}
        {!loading && !error && filteredProducts.length === 0 && (
          <StatusMessage type="empty" />
        )}
        {!loading && !error && filteredProducts.length > 0 && (
          <ProductList products={filteredProducts} addToCart={addToCart} />
        )}
      </div>
    </div>
  );
}
