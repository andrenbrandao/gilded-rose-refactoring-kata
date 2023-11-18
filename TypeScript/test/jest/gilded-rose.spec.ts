import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe("Aged Brie", () => {
    describe('when sellIn is greater than zero', () => {
      it('increases quality with time', () => {
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
});
