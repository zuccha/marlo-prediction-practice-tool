import Card, { Rank, Suit } from "./Card";

type ConstructorOptions = {
  cards: Card[];
  shuffle: boolean;
};

export default class Deck {
  static ALL_CARDS: Card[] = [
    new Card(Suit.Spades, Rank.Ace),
    new Card(Suit.Spades, Rank.Two),
    new Card(Suit.Spades, Rank.Three),
    new Card(Suit.Spades, Rank.Four),
    new Card(Suit.Spades, Rank.Five),
    new Card(Suit.Spades, Rank.Six),
    new Card(Suit.Spades, Rank.Seven),
    new Card(Suit.Spades, Rank.Eight),
    new Card(Suit.Spades, Rank.Nine),
    new Card(Suit.Spades, Rank.Ten),
    new Card(Suit.Spades, Rank.Jack),
    new Card(Suit.Spades, Rank.Queen),
    new Card(Suit.Spades, Rank.King),

    new Card(Suit.Diamonds, Rank.Ace),
    new Card(Suit.Diamonds, Rank.Two),
    new Card(Suit.Diamonds, Rank.Three),
    new Card(Suit.Diamonds, Rank.Four),
    new Card(Suit.Diamonds, Rank.Five),
    new Card(Suit.Diamonds, Rank.Six),
    new Card(Suit.Diamonds, Rank.Seven),
    new Card(Suit.Diamonds, Rank.Eight),
    new Card(Suit.Diamonds, Rank.Nine),
    new Card(Suit.Diamonds, Rank.Ten),
    new Card(Suit.Diamonds, Rank.Jack),
    new Card(Suit.Diamonds, Rank.Queen),
    new Card(Suit.Diamonds, Rank.King),

    new Card(Suit.Clubs, Rank.King),
    new Card(Suit.Clubs, Rank.Queen),
    new Card(Suit.Clubs, Rank.Jack),
    new Card(Suit.Clubs, Rank.Ten),
    new Card(Suit.Clubs, Rank.Nine),
    new Card(Suit.Clubs, Rank.Eight),
    new Card(Suit.Clubs, Rank.Seven),
    new Card(Suit.Clubs, Rank.Six),
    new Card(Suit.Clubs, Rank.Five),
    new Card(Suit.Clubs, Rank.Four),
    new Card(Suit.Clubs, Rank.Three),
    new Card(Suit.Clubs, Rank.Two),
    new Card(Suit.Clubs, Rank.Ace),

    new Card(Suit.Hearts, Rank.King),
    new Card(Suit.Hearts, Rank.Queen),
    new Card(Suit.Hearts, Rank.Jack),
    new Card(Suit.Hearts, Rank.Ten),
    new Card(Suit.Hearts, Rank.Nine),
    new Card(Suit.Hearts, Rank.Eight),
    new Card(Suit.Hearts, Rank.Seven),
    new Card(Suit.Hearts, Rank.Six),
    new Card(Suit.Hearts, Rank.Five),
    new Card(Suit.Hearts, Rank.Four),
    new Card(Suit.Hearts, Rank.Three),
    new Card(Suit.Hearts, Rank.Two),
    new Card(Suit.Hearts, Rank.Ace),
  ];

  _cards: Card[];

  static ConstructorDefaultOptions: ConstructorOptions = {
    cards: [...Deck.ALL_CARDS],
    shuffle: false,
  };

  constructor(maybeOptions?: Partial<ConstructorOptions>) {
    const options = { ...Deck.ConstructorDefaultOptions, ...maybeOptions };

    this._cards = options.cards;

    if (options.shuffle) {
      this.shuffle();
    }
  }

  get count() {
    return this._cards.length;
  }

  get isFull() {
    return this._cards.length === Deck.ALL_CARDS.length;
  }

  get isEmpty() {
    return this._cards.length === 0;
  }

  reset() {
    this._cards = [...Deck.ALL_CARDS];
  }

  empty() {
    this._cards = [];
  }

  shuffle() {
    // While there remain elements to shuffle.
    for (let i = 0; i < this._cards.length; ++i) {
      // Pick another card.
      const j = Math.floor(Math.random() * i);

      // Swap it with the current card.
      [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
    }
  }

  drawTopCard(): Card | undefined {
    return this._cards.pop();
  }

  drawBottomCard(): Card | undefined {
    return this._cards.shift();
  }

  putCardOnTop(card: Card): void {
    this._cards.push(card);
  }

  putCardOnBottom(card: Card): void {
    this._cards.unshift(card);
  }
}
