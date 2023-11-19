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
      const qualityOperator = this.createQualityOperator(this.items[i])
      qualityOperator.updateQuality()
    }

    return this.items;
  }

  createQualityOperator(item: Item) {
    switch (item.name) {
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasQualityOperator(item);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstageQualityOperator(item);
      case 'Aged Brie':
        return new AgedBrieQualityOperator(item);
      default:
        return new GeneralItemQualityOperator(item)
    }
  }
}

class QualityOperator {
  item: Item

  constructor(item: Item) {
    this.item = item
  }

  updateQuality() {
    throw new Error("Subclass must implement updateQuality")
  }

  increaseQuality() {
    this.item.quality = Math.min(50, this.item.quality + 1)
  }

  decreaseQuality() {
    this.item.quality = Math.max(0, this.item.quality - 1)
  }
}

class GeneralItemQualityOperator extends QualityOperator {
  updateQuality(): void {
    this.decreaseQuality()
    this.item.sellIn = this.item.sellIn - 1;
    if (this.item.sellIn < 0) {
      this.decreaseQuality()
    }
  }
}
class SulfurasQualityOperator extends QualityOperator {
  updateQuality(): void { }
}
class AgedBrieQualityOperator extends QualityOperator {
  updateQuality(): void {
    this.increaseQuality()
    this.item.sellIn = this.item.sellIn - 1;
    if (this.item.sellIn < 0) {
      this.increaseQuality()
    }
  }
}
class BackstageQualityOperator extends QualityOperator {
  updateQuality(): void {
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
  }
}
