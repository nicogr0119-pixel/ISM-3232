let productName = "Wireless Headphones";
let costPerUnit = 12.50;
let basePrice = 19.99;
let discountRate = 0.15;   
let salesTaxRate = 0.07;   
let fixedMonthlyCosts = 500; 

let discountedPrice = basePrice * (1 - discountRate);
let finalPriceWithTax = discountedPrice * (1 + salesTaxRate);
let profitPerUnit = finalPriceWithTax - costPerUnit;
let breakEvenUnits = Math.ceil(fixedMonthlyCosts / profitPerUnit);
let isProfitablePerUnit = profitPerUnit >= 0;

console.log("Product Name:", productName);
console.log("Discounted Price (before tax): $" + discountedPrice.toFixed(2));
console.log("Final Price with Tax: $" + finalPriceWithTax.toFixed(2));
console.log("Profit per Unit: $" + profitPerUnit.toFixed(2));
console.log("Break-even Units:", breakEvenUnits);
console.log("Is Profitable Per Unit:", isProfitablePerUnit);
