"use client";

export default function CartSummary({ cart, removeFromCart, resetCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
      <p>Items: {cart.length}</p>
      <p>Total: ${total}</p>
      <div className="mt-2 flex gap-2">
        {cart.length > 0 && (
          <>
            <button
              onClick={resetCart}
              className="btn-danger px-3 py-1 hover:opacity-90 w-full"
            >
              Reset
            </button>
            <button
              onClick={() => removeFromCart(cart[cart.length - 1].id)}
              className="btn-warning px-3 py-1 hover:opacity-90 w-full"
            >
              Remove Last
            </button>
          </>
        )}
      </div>
    </div>
  );
}
