"use client";

export default function ProductCard({ product, addToCart }) {
  const { name, price, stock } = product;

  return (
    <div className="card flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-secondary mt-1">${price}</p>
        <p className={`mt-2 ${stock === 0 ? "out-stock" : "in-stock"}`}>
          {stock === 0 ? "Out of stock" : `In stock: ${stock}`}
        </p>
      </div>
      <button
        disabled={stock === 0}
        onClick={() => addToCart(product)}
        className={`mt-4 px-4 py-2 btn-primary w-full ${
          stock === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
}
