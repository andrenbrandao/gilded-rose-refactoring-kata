import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('General Item', () => {
    it('sellIn decreases with time', () => {
      const gildedRose = new GildedRose([new Item('General Item', 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
    });

    it('decreases with quality over time', () => {
      const gildedRose = new GildedRose([new Item('General Item', 2, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it('quality can never be negative', () => {
      const gildedRose = new GildedRose([new Item('General Item', 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    describe('when sell date has passed', () => {
      it('quality degrades twice as fast', () => {
        const gildedRose = new GildedRose([new Item('General Item', 0, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      });
    })
  })

  describe('Sulfuras', () => {
    it('never decreases in quality', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(10);
    });

    it('does not have to be sold', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
    });
  });

  describe("Backstage Passes", () => {
    it('cannot increate quality over 50', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    describe('when sellIn is 10 days or less', () => {
      it('increases quality by 2', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(2);
      });
    })

    describe('when sellIn is 5 days or less', () => {
      it('increases quality by 3', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(3);
      });
    })

    describe('when concert has passed', () => {
      it('quality drops to zero', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      });
    })
  });

  describe("Aged Brie", () => {
    it('cannot increate quality over 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    describe('when sellIn is greater than zero', () => {
      it('increases quality by 1', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 1, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(1);
        expect(items[0].sellIn).toBe(0);
      });
    })

    describe('when sellIn is zero', () => {
      it('increases quality by 2', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(2);
        expect(items[0].sellIn).toBe(-1);
      });
    })
  })

  describe('Conjured', () => {
    it('sellIn decreases with time', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
    });

    it('quality degrades twice as fast', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 1, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    describe('when sell date has passed', () => {
      it('quality degrades twice as fast as normal items (by 4)', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      });
    })
  })
});
