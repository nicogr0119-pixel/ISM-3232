/* 
  CC_4 – Retail Discount Engine (RAW VERSION, no helper functions)
  - 5-product array with name, category, price, inventory
  - for...of + switch for category discounts (with break)
  - if / else if for customerType extra discount
  - Loop through 3 customers, compute totals, reduce inventory, log results
  - for...in on a single product after discounts
  - Object.entries() + destructuring after inventory updates
*/

// ---------- Step 2: Products ----------
const products = [
  { name: "Aurora Headphones",   category: "electronics", price: 120.00, inventory: 6 },
  { name: "Trailflex Jacket",    category: "apparel",     price: 80.00,  inventory: 10 },
  { name: "Everyday Oats (2lb)", category: "groceries",   price: 6.50,   inventory: 30 },
  { name: "Citrus Dish Soap",    category: "household",   price: 3.99,   inventory: 40 },
  { name: "Hardcover Notebook",  category: "stationery",  price: 12.00,  inventory: 20 } // default = no category promo
];

console.log("Initial catalog:", JSON.parse(JSON.stringify(products)));

// ---------- Step 3: for...of + switch (category discount) ----------
for (const product of products) {
  let categoryDiscountRate = 0;

  switch (product.category) {
    case "electronics":
      categoryDiscountRate = 0.20;
      break;
    case "apparel":
      categoryDiscountRate = 0.15;
      break;
    case "groceries":
    case "household":
      categoryDiscountRate = 0.10;
      break;
    default:
      categoryDiscountRate = 0.00;
      break;
  }

  product.categoryDiscountRate = categoryDiscountRate;
  product.priceAfterCategory = +(product.price * (1 - categoryDiscountRate)).toFixed(2);
}

console.log("After category discounts:", products.map(p => ({
  name: p.name, category: p.category, basePrice: p.price, rate: p.categoryDiscountRate, priceAfterCategory: p.priceAfterCategory
})));

// ---------- Step 4 + 5: Customer type discount + simulate 3 customers ----------
const customers = [
  { customerType: "regular", cart: [ { index: 0, qty: 1 }, { index: 2, qty: 2 } ] },
  { customerType: "student", cart: [ { index: 1, qty: 1 }, { index: 4, qty: 3 } ] },
  { customerType: "senior",  cart: [ { index: 3, qty: 2 }, { index: 2, qty: 1 } ] }
];

console.log("\n--- Checkout Simulation (3 customers) ---");
for (let i = 0; i < customers.length; i++) {
  const customerType = customers[i].customerType;
  const cart = customers[i].cart;

  // if / else if chain for extra discount
  let extraDiscountRate = 0.00;
  if (customerType === "student") {
    extraDiscountRate = 0.05;
  } else if (customerType === "senior") {
    extraDiscountRate = 0.07;
  } else {
    extraDiscountRate = 0.00; // regular or unrecognized
  }

  let subTotal = 0;

  // Compute subtotal at category-discounted prices and reduce inventory
  for (const line of cart) {
    const product = products[line.index];
    if (!product) continue;

    const sellQty = Math.min(line.qty, product.inventory);
    const lineTotal = product.priceAfterCategory * sellQty;
    subTotal += lineTotal;

    // reduce inventory
    product.inventory -= sellQty;
  }

  const total = +(subTotal * (1 - extraDiscountRate)).toFixed(2);
  console.log(
    `Customer #${i + 1} (${customerType}) — Subtotal: $${subTotal.toFixed(2)}, Extra Disc: ${Math.round(extraDiscountRate * 100)}%, Total: $${total.toFixed(2)}`
  );
}

console.log("\nInventory after checkout:", products.map(p => ({ name: p.name, inventory: p.inventory })));

// ---------- Step 6: for...in on a single product (post-discount) ----------
console.log("\n--- Step 6: for...in on first product ---");
const sampleProduct = products[0];
for (const key in sampleProduct) {
  if (Object.prototype.hasOwnProperty.call(sampleProduct, key)) {
    console.log(`${key}:`, sampleProduct[key]);
  }
}

// ---------- Step 7: Object.entries() + destructuring for all products ----------
console.log("\n--- Step 7: Object.entries() + destructuring (all products) ---");
for (const p of products) {
  for (const [key, value] of Object.entries(p)) {
    console.log(`[${p.name}] ${key} ->`, value);
  }
}
