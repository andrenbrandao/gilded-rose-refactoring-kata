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

  updateQuality() {
    if (this.item.name == 'Sulfuras, Hand of Ragnaros') {
      return
    }

    if (this.item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      this.increaseQuality()

      if (this.item.sellIn < 11) {
        this.increaseQuality()
      }
      if (this.item.sellIn < 6) {
        this.increaseQuality()
      }

      this.item.sellIn = this.item.sellIn - 1;

      if (this.item.sellIn < 0) {
        this.item.quality = 0
      }
      return
    }

    if (this.item.name == 'Aged Brie') {
      this.increaseQuality()

      this.item.sellIn = this.item.sellIn - 1;

      if (this.item.sellIn < 0) {
        this.increaseQuality()
      }
      return
    }

    this.decreaseQuality()
    this.item.sellIn = this.item.sellIn - 1;
    if (this.item.sellIn < 0) {
      this.decreaseQuality()
    }
  }

  increaseQuality() {
    this.item.quality = Math.min(50, this.item.quality + 1)
  }

  decreaseQuality() {
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
      qualityOperator.updateQuality()
    }

    return this.items;
  }
}
