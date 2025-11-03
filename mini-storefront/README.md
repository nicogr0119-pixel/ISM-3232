# Mini-Storefront

A small **React + Next.js** storefront app that allows users to browse products, filter by category and price, add items to a cart, and see stock updates.

This project uses **Next.js App Router, React state, TailwindCSS**, and demonstrates:

- Components & JSX
- Lists & Keys
- Props & Callbacks
- State & Controlled Inputs
- Conditional Rendering
- Effects & Cleanup
- Lifting State
- Client vs Server Components
- API Routes

---

## Features

- Browse products across multiple categories (Electronics, Furniture, Stationery, Kitchen, Sports)
- Filter by category and max price
- Add items to cart and see stock decrease
- Remove items from cart or reset cart, restoring stock
- Shows **loading**, **error**, and **empty** states
- Styled with a modern dark-gray theme with yellow-orange highlights

---

## Project Structure

src/
├── app/
│ ├── page.jsx // Main server component
│ ├── api/
│ │ └── products/route.js // Returns product data
│ └── components/
│ ├── Catalog.jsx
│ ├── ProductList.jsx
│ ├── ProductCard.jsx
│ ├── CategoryFilter.jsx
│ ├── PriceFilter.jsx
│ ├── CartSummary.jsx
│ └── StatusMessage.jsx
├── styles/
│ └── globals.css

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <YOUR_REPO_URL>
cd mini-storefront
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open you browser:

http://localhost:3000

## Usage

Use the Category dropdown to filter by category
Use the Max Price input to filter products under a certain price
Click Add to Cart to add a product (stock decreases)
Use Remove Last to remove the last added item
Use Reset to clear the cart and restore all stock

## Testing Different States

1. Loading State

- Open your browser’s Network tab in developer tools
- Set Throttle to Slow 3G or 4G
- Refresh the page (Cmd+R / Ctrl+R)
- The loading message will display while fetching products

2. Error State

- Temporarily change the API path in Catalog.jsx:

`const res = await fetch('/api/products-bad-path');`

3. Empty State

- Set a Max Price lower than any product price (e.g., 1)
- Or select a category with no products
- The empty message “No products found” will appear
