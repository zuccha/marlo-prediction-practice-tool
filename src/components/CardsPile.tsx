import Card from "../models/Card";
import CardImage from "./CardImage";
import "./CardsPile.css";

type CardsPileProps = {
  selectedCard?: Card;
  cards: Card[];
  width: string | number;
  shouldElevateCardOnHover: boolean;
  shouldCompletelyOverlapCards: boolean;
  shouldShowCardValuesOnHover: boolean;
  cardsOffset: number;
};

const CardsPile = ({
  selectedCard,
  cards,
  width,
  shouldElevateCardOnHover,
  shouldCompletelyOverlapCards,
  shouldShowCardValuesOnHover,
  cardsOffset,
}: CardsPileProps) => {
  return (
    <div className="cards-pile">
      {cards.map((card, i) => {
        const isHighlighted = selectedCard && card.equals(selectedCard);
        return (
          <div
            key={card.name}
            className="cards-pile-card"
            style={{
              top: shouldCompletelyOverlapCards ? 0 : cardsOffset * i,
            }}
          >
            <div
              className={
                shouldCompletelyOverlapCards
                  ? undefined
                  : isHighlighted && shouldElevateCardOnHover
                  ? "cards-pile-card-image-highlighted-hover"
                  : isHighlighted
                  ? "cards-pile-card-image-highlighted"
                  : shouldElevateCardOnHover
                  ? "cards-pile-card-image-hover"
                  : undefined
              }
            >
              <CardImage card={card} width={width} />

              {shouldElevateCardOnHover && shouldShowCardValuesOnHover && (
                <div
                  className="cards-pile-card-hints-container"
                  style={{ width }}
                >
                  <div className="cards-pile-card-hints">
                    <span>
                      Value: <b>{card.rank.value}</b>
                    </span>
                    <span>
                      Spell "{card.rank.spelling.toUpperCase()}":{" "}
                      <b>{card.rank.spelling.length}</b>
                    </span>
                    <span>
                      Spell "
                      {card.suit.slice(0, card.suit.length - 1).toUpperCase()}":{" "}
                      <b>{card.suit.slice(0, card.suit.length - 1).length}</b>
                    </span>
                    <span>
                      Spell "{card.suit.toUpperCase()}":{" "}
                      <b>{card.suit.length}</b>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardsPile;
