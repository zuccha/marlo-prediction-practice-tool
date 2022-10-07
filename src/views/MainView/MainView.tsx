import { useCallback, useRef, useState } from "react";
import CardsPile from "../../components/CardsPile";
import Separator from "../../components/Separator";
import useRender from "../../hooks/useRender";
import Card, { Rank, RankByName, Suit } from "../../models/Card";
import Deck from "../../models/Deck";
import "./MainView.css";

type Distance = {
  pileIndex: number;
  fromBottom: number;
  fromTop: number;
};

const MainView = () => {
  const render = useRender();

  const deck = useRef(new Deck({ shuffle: true })).current;

  const currentPileIndexRef = useRef(0);
  const piles = useRef<[Card[], Card[], Card[]]>([[], [], []]).current;

  const dealingIntervalIdRef = useRef<ReturnType<typeof setInterval>>();
  const [dealingSpeed, setDealingSpeed] = useState(500);

  const [cardsOffset, setCardsOffset] = useState(32);

  const [shouldCompletelyOverlapCards, setShouldCompletelyOverlapCards] =
    useState(false);
  const [highlightSelectedCard, setHighlightSelectedCard] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [showCardsLeftInDeck, setShowCardsLeftInDeck] = useState(true);
  const [shouldElevateCardOnHover, setShouldElevateCardsOnHover] =
    useState(true);
  const [shouldShowCardValuesOnHover, setShouldShowCardValuesOnHover] =
    useState(true);

  const [selectedCard, setSelectedCard] = useState(
    new Card(Suit.Hearts, Rank.Eight)
  );
  const distanceRef = useRef<Distance>();

  const computeDistance = useCallback(() => {
    for (let i = 0; i < piles.length; ++i) {
      const pile = piles[i];
      const index = pile.findIndex((card) => selectedCard.equals(card));
      if (index !== -1) {
        distanceRef.current = {
          pileIndex: i,
          fromBottom: pile.length - index,
          fromTop: index + 1,
        };
      }
    }
  }, [selectedCard]);

  const reset = useCallback(() => {
    clearInterval(dealingIntervalIdRef.current);
    dealingIntervalIdRef.current = undefined;

    distanceRef.current = undefined;

    deck.reset();
    deck.shuffle();

    currentPileIndexRef.current = 0;
    piles[0] = [];
    piles[1] = [];
    piles[2] = [];

    render();
  }, [render]);

  const dealNextCard = useCallback((): boolean => {
    const card = deck.drawTopCard();
    if (!card) {
      return false;
    }

    piles[currentPileIndexRef.current] = [
      ...piles[currentPileIndexRef.current],
      card,
    ];
    currentPileIndexRef.current = (currentPileIndexRef.current + 1) % 3;

    computeDistance();

    render();

    return true;
  }, [computeDistance, render]);

  const startDealingCardsOneByOne = useCallback(() => {
    dealNextCard();
    dealingIntervalIdRef.current = setInterval(() => {
      const isCardDealt = dealNextCard();
      if (!isCardDealt) {
        clearInterval(dealingIntervalIdRef.current);
        dealingIntervalIdRef.current = undefined;
        render();
      }
    }, dealingSpeed);
  }, [dealNextCard, dealingSpeed, render]);

  const stopDealingCardsOneByOne = useCallback(() => {
    clearInterval(dealingIntervalIdRef.current);
    dealingIntervalIdRef.current = undefined;

    render();
  }, [render]);

  const dealAllCardsTogether = useCallback(() => {
    let hasDealtCard = dealNextCard();
    while (hasDealtCard) {
      hasDealtCard = dealNextCard();
    }
  }, [dealNextCard]);

  const handleChangeSelectedCardSuit = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCard((v) => new Card(e.target.value as Suit, v.rank));
      computeDistance();
      render();
    },
    [computeDistance, render]
  );

  const handleChangeSelectedCardRank = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const rank = RankByName[e.target.value as keyof typeof RankByName];
      setSelectedCard((v) => new Card(v.suit, rank));
      computeDistance();
      render();
    },
    [computeDistance, render]
  );

  const isDealing = !!dealingIntervalIdRef.current;

  return (
    <div className="container">
      <div className="content">
        <div className="settings">
          <Separator text="Commands" />

          <button
            type="button"
            disabled={deck.isEmpty}
            onClick={
              isDealing ? stopDealingCardsOneByOne : startDealingCardsOneByOne
            }
          >
            {isDealing
              ? "Stop"
              : deck.isFull
              ? "Start"
              : deck.isEmpty
              ? "Done"
              : "Continue"}
          </button>
          <button
            type="button"
            disabled={deck.isEmpty}
            onClick={dealAllCardsTogether}
          >
            Deal All
          </button>
          <button
            type="button"
            disabled={isDealing || deck.isEmpty}
            onClick={dealNextCard}
          >
            Deal Next
          </button>
          <button type="button" disabled={deck.isFull} onClick={reset}>
            Reset
          </button>

          <Separator text="Stats" />

          <div className="stat">
            <span>Pile:</span>
            <b>
              {!showDistance
                ? "<hidden>"
                : !distanceRef.current
                ? "<n/a>"
                : distanceRef.current?.pileIndex + 1}
            </b>
          </div>

          <div className="stat">
            <span>Distance from top:</span>
            <b>
              {!showDistance
                ? "<hidden>"
                : !distanceRef.current
                ? "<n/a>"
                : distanceRef.current?.fromTop}
            </b>
          </div>

          <div className="stat">
            <span>Distance from bottom:</span>
            <b>
              {!showDistance
                ? "<hidden>"
                : !distanceRef.current
                ? "<n/a>"
                : distanceRef.current?.fromBottom}
            </b>
          </div>

          <div className="stat">
            <span>Cards left in deck:</span>
            <b>{showCardsLeftInDeck ? deck.count : "<hidden>"}</b>
          </div>

          <Separator text="Settings" />

          <div className="setting">
            <span>Prediction card:</span>

            <select
              value={selectedCard.rank.name}
              onChange={handleChangeSelectedCardRank}
            >
              <option value={Rank.Ace.name}>Ace</option>
              <option value={Rank.Two.name}>Two</option>
              <option value={Rank.Three.name}>Three</option>
              <option value={Rank.Four.name}>Four</option>
              <option value={Rank.Five.name}>Five</option>
              <option value={Rank.Six.name}>Six</option>
              <option value={Rank.Seven.name}>Seven</option>
              <option value={Rank.Eight.name}>Eight</option>
              <option value={Rank.Nine.name}>Nine</option>
              <option value={Rank.Ten.name}>Ten</option>
              <option value={Rank.Jack.name}>Jack</option>
              <option value={Rank.Queen.name}>Queen</option>
              <option value={Rank.King.name}>King</option>
            </select>

            <span style={{ margin: "0 4px" }}>of</span>

            <select
              value={selectedCard.suit}
              onChange={handleChangeSelectedCardSuit}
            >
              <option value={Suit.Clubs}>Clubs</option>
              <option value={Suit.Diamonds}>Diamonds</option>
              <option value={Suit.Hearts}>Hearts</option>
              <option value={Suit.Spades}>Spades</option>
            </select>
          </div>

          <div className="setting">
            <span>Dealing speed (ms):</span>
            <input
              type="number"
              step={10}
              value={dealingSpeed}
              onChange={(e) => setDealingSpeed(Number(e.target.value) || 500)}
              style={{ width: "70px" }}
            />
          </div>

          <div className="setting">
            <span>Cards offset (px):</span>
            <input
              type="number"
              value={cardsOffset}
              onChange={(e) => setCardsOffset(Number(e.target.value) || 32)}
              style={{ width: "70px" }}
            />
          </div>

          <div className="setting">
            <input
              type="checkbox"
              checked={shouldCompletelyOverlapCards}
              onChange={() => setShouldCompletelyOverlapCards((v) => !v)}
            />
            <span>Overlap cards completely</span>
          </div>

          <div className="setting">
            <input
              type="checkbox"
              checked={highlightSelectedCard}
              onChange={() => setHighlightSelectedCard((v) => !v)}
            />
            <span>Highlight prediction card</span>
          </div>

          <div className="setting">
            <input
              type="checkbox"
              checked={showDistance}
              onChange={() => setShowDistance((v) => !v)}
            />
            <span>Show prediction card distance</span>
          </div>

          <div className="setting">
            <input
              type="checkbox"
              checked={showCardsLeftInDeck}
              onChange={() => setShowCardsLeftInDeck((v) => !v)}
            />
            <span>Show cards left in deck</span>
          </div>

          <div className="setting">
            <input
              type="checkbox"
              checked={shouldElevateCardOnHover}
              onChange={() => setShouldElevateCardsOnHover((v) => !v)}
            />
            <span>Elevate card on hover</span>
          </div>

          <div className="setting">
            <input
              type="checkbox"
              checked={shouldShowCardValuesOnHover}
              onChange={() => setShouldShowCardValuesOnHover((v) => !v)}
            />
            <span>Show card values on hover</span>
          </div>

          <Separator text="Resources" />

          <a href="https://www.youtube.com/watch?v=Fa84HtYSjsU" target="_blank">
            Tutorial video
          </a>

          <a href="https://github.com/zuccha/" target="_blank">
            Source code
          </a>

          <Separator text="Credits" />

          <span>
            Trick by{" "}
            <a href="https://www.youtube.com/user/TomMatriq" target="_blank">
              Tom Matriq
            </a>
          </span>
          <span>
            Practice tool by{" "}
            <a href="https://zuccha.io" target="_blank">
              Amedeo Zucchetti
            </a>
          </span>
        </div>

        {piles.map((pile, i) => (
          <div className="cards-pile-container" key={`pile-${i}`}>
            <CardsPile
              cards={pile}
              width="100%"
              selectedCard={highlightSelectedCard ? selectedCard : undefined}
              shouldElevateCardOnHover={shouldElevateCardOnHover}
              shouldCompletelyOverlapCards={shouldCompletelyOverlapCards}
              shouldShowCardValuesOnHover={shouldShowCardValuesOnHover}
              cardsOffset={cardsOffset}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainView;
