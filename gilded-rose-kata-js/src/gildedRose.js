class GildedRose {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      this.updateItem(item);
    }
  }

  updateItem(item) {
    item.sellIn--;

    if (item.sellIn < 0) {
      item.quality -= 2;
    } else {
      item.quality--;
    }

    item.quality = Math.max(0, Math.min(50, item.quality));
  }
}

module.exports = GildedRose;
