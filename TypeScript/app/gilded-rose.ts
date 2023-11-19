export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  private items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateItemQuality(this.items[i])
    }

    return this.items;
  }

  updateItemQuality(item: Item) {
    if (item.name == 'Sulfuras, Hand of Ragnaros') {
      return
    }

    if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      this.increaseItemQuality(item)

      if (item.sellIn < 11) {
        this.increaseItemQuality(item)
      }
      if (item.sellIn < 6) {
        this.increaseItemQuality(item)
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        item.quality = 0
      }
      return
    }

    if (item.name == 'Aged Brie') {
      this.increaseItemQuality(item)

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        this.increaseItemQuality(item)
      }
      return
    }

    this.decreaseItemQuality(item)
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      this.decreaseItemQuality(item)
    }
  }

  increaseItemQuality(item: Item) {
    item.quality = Math.min(50, item.quality + 1)
  }

  decreaseItemQuality(item: Item) {
    item.quality = Math.max(0, item.quality - 1)
  }
}
