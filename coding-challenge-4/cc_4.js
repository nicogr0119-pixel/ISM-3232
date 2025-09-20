/* 
  Coding Challenge 04 – Retail Discount Engine
  ------------------------------------------------
  What this file demonstrates (aligned to rubric):
  - Step 2: Array of 5 products (name, category, price, inventory)
  - Step 3: for...of + switch for category discounts (with break to avoid fall-through)
  - Step 4: if/else if chain for customerType additional discount
  - Step 5: Loop over 3 customers: compute totals, reduce inventory, log results
  - Step 6: for...in to log key/value of a single, post-discount product
  - Step 7: Object.entries() + destructuring to log all products after inventory update
  - Code quality: comments, camelCase, console.log() checks
*/

// ---------- Step 2: Products ----------
/**
 * Each product: { name, category, price, inventory }
 * (Prices are in USD; inventory in whole units)
 */
const products = [
  { name: "Aurora Headphones", category: "electronics", price: 120.00, inventory: 6 },
  { name: "Trailflex Jacket", category: "apparel",     price: 80.00,  inventory: 10 },
  { name: "Everyday Oats (2lb)", category: "groceries",  price: 6.50,  inventory: 30 },
  { name: "Citrus Dish Soap",    category: "household",  price: 3.99,  inventory: 40 },
  { name: "Hardcover Notebook",  category: "stationery", price: 12.00, inventory: 20 } // default case (no category promo)
];

console.log("Initial catalog:", JSON.parse(JSON.stringify(products)));

// ---------- Helpers ----------
/** Returns the category promo rate based on product.category using a switch */
function getCategoryDiscountRate(category) {
  let rate = 0;
  // ---------- Step 3: switch ----------
  switch (category) {
    case "electronics":
      rate = 0.20;
      break;
    case "apparel":
      rate = 0.15;
      break;
    case "groceries":
    case "household":
      rate = 0.10;
      break;
    default:
      rate = 0.00; // no discount
      break;
  }
  return rate;
}

/** Applies category discount in-place and annotates product for transparency */
function applyCategoryDiscounts(items) {
  for (const product of items) { // ---------- Step 3: for...of ----------
    const rate = getCategoryDiscountRate(product.category);
    product.categoryDiscountRate = rate;
    product.priceAfterCategory = +(product.price * (1 - rate)).toFixed(2);
  }
}

applyCategoryDiscounts(products);
console.log("After category discounts:", products.map(p => ({
  name: p.name, category: p.category, basePrice: p.price, rate: p.categoryDiscountRate, priceAfterCategory: p.priceAfterCategory
})));

// ---------- Step 4: Customer type extra discount ----------
/**
 * Returns extra discount rate for the whole cart, based on customerType
 * Valid types: "regular", "student", "senior"
 */
function getCustomerExtraDiscountRate(customerType) {
  // ---------- Step 4: if / else if ----------
  if (customerType === "student") {
    return 0.05;
  } else if (customerType === "senior") {
    return 0.07;
  } else {
    return 0.00; // "regular" or any other unrecognized type
  }
}

// ---------- Step 5: Simulate checkout for 3 customers ----------
/**
 * Simple, deterministic carts for three customers.
 * Each entry is an array of { index: productIndex, qty: number }
 * We always guard against insufficient inventory.
 */
const customers = [
  { customerType: "regular", cart: [ { index: 0, qty: 1 }, { index: 2, qty: 2 } ] }, // 1x electronics, 2x groceries
  { customerType: "student", cart: [ { index: 1, qty: 1 }, { index: 4, qty: 3 } ] }, // 1x apparel, 3x stationery
  { customerType: "senior",  cart: [ { index: 3, qty: 2 }, { index: 2, qty: 1 } ] }  // 2x household, 1x groceries
];

console.log("\n--- Checkout Simulation (3 customers) ---");

for (let i = 0; i < customers.length; i++) { // can also be while; using for for clarity
  const { customerType, cart } = customers[i];
  const extraRate = getCustomerExtraDiscountRate(customerType);

  let subTotal = 0;

  // Calculate subtotal at category-discounted prices
  for (const line of cart) {
    const product = products[line.index];
    if (!product) continue;

    // Ensure we don't sell more than we have
    const sellQty = Math.min(line.qty, product.inventory);
    const lineTotal = product.priceAfterCategory * sellQty;
    subTotal += lineTotal;

    // Reduce inventory (after computing lineTotal)
    product.inventory -= sellQty;
  }

  const total = +(subTotal * (1 - extraRate)).toFixed(2);

  console.log(
    `Customer #${i + 1} (${customerType}) — Subtotal: $${subTotal.toFixed(2)}, Extra Disc: ${Math.round(extraRate * 100)}%, Total: $${total.toFixed(2)}`
  );
}

console.log("\nInventory after checkout:", products.map(p => ({ name: p.name, inventory: p.inventory })));

// ---------- Step 6: for...in to log one product after discounts ----------
console.log("\n--- Step 6: for...in on a single product (post-discount) ---");
const sampleProduct = products[0]; // pick the first product
for (const key in sampleProduct) { // ---------- Step 6: for...in ----------
  // Only log own properties (good habit, though these are plain objects)
  if (Object.prototype.hasOwnProperty.call(sampleProduct, key)) {
    console.log(`${key}:`, sampleProduct[key]);
  }
}

// ---------- Step 7: Object.entries() + destructuring for all products ----------
console.log("\n--- Step 7: Object.entries() + destructuring (post-inventory update) ---");
for (const product of products) {
  // Destructure each [key, value] pair
  for (const [key, value] of Object.entries(product)) { // ---------- Step 7 ----------
    // Example log in a compact, readable line
    console.log(`[${product.name}] ${key} ->`, value);
  }
}
