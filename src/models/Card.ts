export enum Suit {
  Clubs = "clubs",
  Diamonds = "diamonds",
  Hearts = "hearts",
  Spades = "spades",
}

export const Rank = {
  Ace: { name: "ace", short: "a", value: 1, spelling: "ace" },
  Two: { name: "2", short: "2", value: 2, spelling: "two" },
  Three: { name: "3", short: "3", value: 3, spelling: "three" },
  Four: { name: "4", short: "4", value: 4, spelling: "four" },
  Five: { name: "5", short: "5", value: 5, spelling: "five" },
  Six: { name: "6", short: "6", value: 6, spelling: "six" },
  Seven: { name: "7", short: "7", value: 7, spelling: "seven" },
  Eight: { name: "8", short: "8", value: 8, spelling: "eight" },
  Nine: { name: "9", short: "9", value: 9, spelling: "nine" },
  Ten: { name: "10", short: "10", value: 10, spelling: "ten" },
  Jack: { name: "jack", short: "j", value: 10, spelling: "jack" },
  Queen: { name: "queen", short: "q", value: 10, spelling: "queen" },
  King: { name: "king", short: "k", value: 10, spelling: "king" },
} as const;

export const RankByName = {
  ace: Rank.Ace,
  2: Rank.Two,
  3: Rank.Three,
  4: Rank.Four,
  5: Rank.Five,
  6: Rank.Six,
  7: Rank.Seven,
  8: Rank.Eight,
  9: Rank.Nine,
  10: Rank.Ten,
  jack: Rank.Jack,
  queen: Rank.Queen,
  king: Rank.King,
} as const;

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default class Card {
  private readonly _suit: Suit;
  private readonly _rank: typeof Rank[keyof typeof Rank];

  constructor(suit: Suit, rank: typeof Rank[keyof typeof Rank]) {
    this._suit = suit;
    this._rank = rank;
  }

  get suit(): Suit {
    return this._suit;
  }

  get rank(): typeof Rank[keyof typeof Rank] {
    return this._rank;
  }

  get filename(): string {
    return `${this._suit}_${this._rank.name}`;
  }

  get name(): string {
    return `${this._rank.spelling} of ${this._suit}`;
  }

  get nameCapitalized(): string {
    const spelling = capitalize(this._rank.spelling);
    const suit = capitalize(this._suit);
    return `${spelling} of ${suit}`;
  }

  equals(card: Card): boolean {
    return this.name === card.name;
  }
}
