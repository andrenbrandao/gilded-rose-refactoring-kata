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
      if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
        continue
      }

      if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.increaseItemQuality(i)

        if (this.items[i].sellIn < 11) {
          this.increaseItemQuality(i)
        }
        if (this.items[i].sellIn < 6) {
          this.increaseItemQuality(i)
        }
      }

      if (this.items[i].name == 'Aged Brie') {
        this.increaseItemQuality(i)
      }

      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        this.decreaseItemQuality(i)
      }

      this.items[i].sellIn = this.items[i].sellIn - 1;

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name == 'Aged Brie') {
          this.increaseItemQuality(i)
          continue
        }

        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          this.items[i].quality = 0
          continue
        }

        this.decreaseItemQuality(i)
      }
    }

    return this.items;
  }

  increaseItemQuality(pos: number) {
    const quality = this.items[pos].quality
    this.items[pos].quality = Math.min(50, quality + 1)
  }

  decreaseItemQuality(pos: number) {
    const quality = this.items[pos].quality
    this.items[pos].quality = Math.max(0, quality - 1)
  }
}
