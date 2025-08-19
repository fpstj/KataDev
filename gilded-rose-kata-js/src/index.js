const fs = require("fs");
const path = require("path");
const Item = require("./Item");
const GildedRose = require("./gildedRose");

// Read and parse items.json
const rawData = fs.readFileSync(path.join(__dirname, "items.json"), "utf8");
const categories = JSON.parse(rawData);

// Recursive function to print nested structure
function printNested(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  if (Array.isArray(obj)) {
    obj.forEach((item) => printNested(item, indent));
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      // Print category or subcategory name
      console.log(`${pad}${key}:`);
      printNested(obj[key], indent + 1);
    }
    // If it's an item (has name, sellIn, quality), print details
    if (
      obj.name &&
      typeof obj.sellIn === "number" &&
      typeof obj.quality === "number"
    ) {
      console.log(
        `${pad}- ${obj.name} (SellIn: ${obj.sellIn}, Quality: ${obj.quality})`
      );
    }
  }
}

// Helper function to flatten deeply nested items
function extractItems(data) {
  let items = [];
  for (const entry of data) {
    if (Array.isArray(entry)) {
      items = items.concat(extractItems(entry));
    } else if (typeof entry === "object") {
      for (const key in entry) {
        if (Array.isArray(entry[key])) {
          items = items.concat(extractItems(entry[key]));
        } else if (typeof entry[key] === "object") {
          items = items.concat(extractItems([entry[key]]));
        }
      }
      // If object has name, sellIn, quality, treat as item
      if (
        entry.name &&
        typeof entry.sellIn === "number" &&
        typeof entry.quality === "number"
      ) {
        items.push(entry);
      }
    }
  }
  return items;
}

// Print the full nested structure for visualization
printNested(categories);

// Flatten items for GildedRose logic
const itemsData = extractItems(categories);
const items = itemsData.map(
  (data) => new Item(data.name, data.sellIn, data.quality)
);

const shop = new GildedRose(items);
shop.updateQuality();
console.table(shop.items);
// shop.items.forEach(item => {
//   console.log(`Name: ${item.name}, SellIn: ${item.sellIn}, Quality: ${item.quality}`);
// });
