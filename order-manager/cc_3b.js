//Step 2 
//Make the inventory 
let inventory = [
{sku:"SKU-001", name1:"apple", price: 1.00 , stock:23},
{sku:"SKU-002", name1:"banana", price: 0.50 , stock:19},
{sku:"SKU-003", name1:"orange", price: 1.50 , stock:30},
{sku:"SKU-004", name1:"pear", price: 2.00 , stock:13},
];
// Summary of the products  
inventory.forEach(p =>
  console.log(`${p.sku} | ${p.name} | ${fmt$(p.price)} | Stock: ${p.stock}`)
);
//Step 3 
//add a new product with push 
let newProduct={sku:"SKU-005", name1:"grapes", price: 2.50, stock:17};inventory.push(newProduct);
console.log("Added:", `${newProduct.sku} | ${newProduct.name} | ${fmt$(newProduct.price)} | Stock: ${newProduct.stock}`);
