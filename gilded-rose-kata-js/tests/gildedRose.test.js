const GildRose = require("../src/GildRose");
const Item = require("../src/Item");

describe("GildedRose", () => {
  let gildedRose;

  beforeEach(() => {
    gildedRose = new GildRose();
  });

  it("should return items without changes (initial test)", () => {
    const items = [new Item("foo", 10, 20)];
    const app = new GildedRose(items);
    const updatedItems = app.updateQuality();
    expect(updatedItems[0].name).toBe("foo");
    expect(updatedItems[0].sellIn).toBe(10);
    expect(updatedItems[0].quality).toBe(20);
  });

  test("should update the quality of a normal item", () => {
    const item = new Item("Normal Item", 10, 20);
    gildedRose.items.push(item);
    gildedRose.updateQuality();
    expect(item.sellIn).toBe(9);
    expect(item.quality).toBe(19);
  });
});
