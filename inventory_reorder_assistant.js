
const itemName = "USB-C Cable";           

const unitCost = 3.25;                     
const currentStock = 120;                  
const reorderLevel = 50;                  
const targetStock = 200;                   
const weeklyDemand = 40;                   
const supplierLeadTimeWeeks = 2;           

const weeksOfCover = weeklyDemand > 0 ? currentStock / weeklyDemand : Infinity;

const stockDeficit = Math.max(0, targetStock - currentStock);

const shouldReorder = (currentStock <= reorderLevel) || (weeksOfCover < supplierLeadTimeWeeks);

const reorderQuantity = shouldReorder ? Math.ceil(stockDeficit) : 0;

const estimatedReorderCost = reorderQuantity * unitCost;

const reorderNow = shouldReorder; 

const label = (k, v) => console.log(`${k}: ${v}`);

label("Item", itemName);
label("Weeks of cover", Number.isFinite(weeksOfCover) ? weeksOfCover.toFixed(2) : "∞");
label("Reorder now?", reorderNow);
label("Recommended reorder quantity", reorderQuantity);
label("Estimated reorder cost", `$${estimatedReorderCost.toFixed(2)}`);

label("Current stock", currentStock);
label("Target stock", targetStock);
label("Reorder level", reorderLevel);
