export async function GET() {
  const products = [
    // Electronics
    {
      id: "p1",
      name: "Laptop",
      price: 1200,
      category: "Electronics",
      stock: 5,
    },
    {
      id: "p2",
      name: "Smartphone",
      price: 900,
      category: "Electronics",
      stock: 4,
    },
    {
      id: "p3",
      name: "Headphones",
      price: 150,
      category: "Electronics",
      stock: 8,
    },

    // Furniture
    {
      id: "p4",
      name: "Desk Chair",
      price: 150,
      category: "Furniture",
      stock: 3,
    },
    {
      id: "p5",
      name: "Office Desk",
      price: 350,
      category: "Furniture",
      stock: 2,
    },

    // Stationery
    { id: "p6", name: "Notebook", price: 5, category: "Stationery", stock: 20 },
    { id: "p7", name: "Pen Set", price: 12, category: "Stationery", stock: 15 },

    // Kitchen
    {
      id: "p8",
      name: "Coffee Maker",
      price: 80,
      category: "Kitchen",
      stock: 6,
    },
    { id: "p9", name: "Blender", price: 60, category: "Kitchen", stock: 5 },

    // Sports
    { id: "p10", name: "Yoga Mat", price: 25, category: "Sports", stock: 10 },
    { id: "p11", name: "Dumbbells", price: 50, category: "Sports", stock: 7 },
    {
      id: "p12",
      name: "Tennis Racket",
      price: 120,
      category: "Sports",
      stock: 4,
    },
  ];

  return Response.json(products);
}
