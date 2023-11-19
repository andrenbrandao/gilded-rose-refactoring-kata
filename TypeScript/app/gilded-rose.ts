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

class QualityOperator {
  item: Item

  constructor(item: Item) {
    this.item = item
  }

  updateItemQuality() {
    if (this.item.name == 'Sulfuras, Hand of Ragnaros') {
      return
    }

    if (this.item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      this.increaseItemQuality()

      if (this.item.sellIn < 11) {
        this.increaseItemQuality()
      }
      if (this.item.sellIn < 6) {
        this.increaseItemQuality()
      }

      this.item.sellIn = this.item.sellIn - 1;

      if (this.item.sellIn < 0) {
        this.item.quality = 0
      }
      return
    }

    if (this.item.name == 'Aged Brie') {
      this.increaseItemQuality()

      this.item.sellIn = this.item.sellIn - 1;

      if (this.item.sellIn < 0) {
        this.increaseItemQuality()
      }
      return
    }

    this.decreaseItemQuality()
    this.item.sellIn = this.item.sellIn - 1;
    if (this.item.sellIn < 0) {
      this.decreaseItemQuality()
    }
  }

  increaseItemQuality() {
    this.item.quality = Math.min(50, this.item.quality + 1)
  }

  decreaseItemQuality() {
    this.item.quality = Math.max(0, this.item.quality - 1)
  }
}
export class GildedRose {
  private items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const qualityOperator = new QualityOperator(this.items[i])
      qualityOperator.updateItemQuality()
    }

    return this.items;
  }
}
